#include "ServerPCH.h"
#include "Game.h"

#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"
#include "PlayerManager.h"
#include "ObstacleManager.h"
#include "StatusManager.h"
#include "Player.h"
#include "Grid.h"

#ifdef WIN32
#include <Windows.h>
#endif

sv::Game::Game()
: m_TimeLastMsg(0)
, m_Status(eGameStatus_Wait)
, m_Countdown(0)
, m_RunTime(0)
, m_PlayerManager(0)
, m_Grid(0)
, m_StatusManager(0)
{
	m_Grid = S_NEW Grid();
	m_PlayerManager = S_NEW PlayerManager(this);
	m_ObstacleManager = S_NEW ObstacleManager(this);
	m_StatusManager = S_NEW StatusManager(this);
}

sv::Game::~Game()
{
	Server::Instance()->CloseSocket(m_Socket);
	delete(m_StatusManager);
	delete(m_ObstacleManager);
	delete(m_PlayerManager);
	delete(m_Grid);
}

void sv::Game::Init(uint id, int socket)
{
	Reset();

	m_Id = id;
	m_Socket = socket;
	InitTime();
}

void sv::Game::Reset()
{
	m_PlayerManager->Reset();
	m_ObstacleManager->Reset();
	m_StatusManager->Reset();
	m_Grid->Reset();

	m_Status = eGameStatus_Wait;
	m_Countdown = 0;
}

void sv::Game::Update()
{
	uint deltaTime = GetDeltaTime();
	LOG1(DEBUG_TIME, "passed time in microsec: %d\n", deltaTime);

	switch(m_Status)
	{
		case eGameStatus_Wait:
		{

		} break;
		case eGameStatus_Countdown:
		{
			m_Countdown += deltaTime;
			if(m_Countdown > COUNTDOWN)
			{
				LOG(DEBUG_FLOW, "Countdown ended");
				Start();
			}
		} break;
		case eGameStatus_Run:
		{
			m_PlayerManager->Update(deltaTime);
			m_ObstacleManager->Update(deltaTime);

			m_RunTime += deltaTime;
			if(m_RunTime >= PLAY_TIME)
				End();
		} break;
	}

	m_TimeLastMsg += deltaTime;
	if(m_TimeLastMsg > POLLING_RATE)
	{
		PollingMsg msg;
		SendMsg(&msg);
	}
}

void sv::Game::Start()
{
	m_Status = eGameStatus_Run;
	m_RunTime = 0;
	
	uchar playerNumber = m_PlayerManager->GetNumber();

	m_Grid->Start(playerNumber);
	m_PlayerManager->Start();
	m_ObstacleManager->Start();

	uchar color[PLAYER_MAX];
	uchar pos[PLAYER_MAX];
	m_PlayerManager->GetColors(color);
	m_PlayerManager->GetPos(pos);
	StartMsg startMsg(playerNumber, m_Grid->GetNumberLanes());
	startMsg.SetColors(color);
	startMsg.SetPos(pos);
	SendMsg(&startMsg);
}

void sv::Game::End()
{
	LOG(DEBUG_FLOW, "Game ended.");
	m_Status = eGameStatus_Wait;
	EndMsg endMgs(m_StatusManager->GetPoints());
	SendMsg(&endMgs);

	m_Grid->Reset();
	m_PlayerManager->Reset();
	m_ObstacleManager->Reset();
	m_StatusManager->Reset();
}

void sv::Game::HandleMsg(sv::InputMsg* msg)
{
	LOG1(DEBUG_MSG, "Action: %i\n", msg->GetAction());
	switch(msg->GetAction())
	{
	case eContrAction_Start:
		HandleStartMsg(msg);
		break;
	case eContrAction_Right:
	case eContrAction_Left:
	case eContrAction_Up:
	case eContrAction_Down:
	case eContrAction_Clockwise:
	case eContrAction_AntiClockwise:
		HandleMoveMsg(msg, msg->GetAction() - eContrAction_Right);
		break;
	case eContrAction_Heal:
		HandleHealMsg(msg);
		break;
	case eContrAction_Polling:
		if(m_Status == eGameStatus_Wait)
		{
			ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_NotRunning);
			Server::Instance()->Response(&response, msg->GetSocket());
		}
		else
		{
			ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Ok);
			Server::Instance()->Response(&response, msg->GetSocket());
		}
		break;
	default:
		{
			ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Failed);
			Server::Instance()->Response(&response, msg->GetSocket());
		} break;
	}
}

void sv::Game::HandleStartMsg(InputMsg* msg)
{
	bool success = false;
	if(m_Status != eGameStatus_Run)
	{
		Player* pl = m_PlayerManager->AddPlayer();
		if(pl)
		{
			if(m_Status == eGameStatus_Wait)
			{
				GetDeltaTime();
				m_Countdown = 0;
				m_Status = eGameStatus_Countdown;
				LOG(DEBUG_FLOW, "Countdown started");
			}

			LOG(DEBUG_FLOW, "Player added");

			JoinCountdownMsg joinCountdownMsg((uchar)(COUNTDOWN/1000), pl->GetColor());
			SendMsg(&joinCountdownMsg);

			ResponseStartMsg response(pl->GetId(), pl->GetColor());
			Server::Instance()->Response(&response, msg->GetSocket());
						
			success = true;
			return;
		}
		else
			LOG(DEBUG_FLOW, "Player not added");


	}
	if(! success)
	{
		ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Failed);
		Server::Instance()->Response(&response, msg->GetSocket());
	}
}

void sv::Game::HandleMoveMsg(InputMsg* msg, uchar dir)
{
	bool success = false;
	if(m_Status == eGameStatus_Wait)
	{
		ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_NotRunning);
		Server::Instance()->Response(&response, msg->GetSocket());
		return;
	}

	if(m_Status == eGameStatus_Run)
	{
		Player* player = m_PlayerManager->GetPlayer(msg->GetControllerId());
		if(player)
		{
			uchar pos = player->Move(dir);
			MoveMsg moveMsg(player->GetId(), pos);
			SendMsg(&moveMsg);

			success = true;
		}
	}

	ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Ok);
	Server::Instance()->Response(&response, msg->GetSocket());
}

void sv::Game::HandleHealMsg(InputMsg* msg)
{
	bool success = false;
	if(m_Status == eGameStatus_Wait)
	{
		ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_NotRunning);
		Server::Instance()->Response(&response, msg->GetSocket());
		return;
	}
	
	if(m_Status == eGameStatus_Run)
	{
		Player* player = m_PlayerManager->GetPlayer(msg->GetControllerId());
		if(player)
		{			
			Player* target[PLAYER_MAX];
			uchar count = 0;
			GetGrid()->GetPlayer(player->GetPos(), target, count);
			
			uchar pos = 0;
			for(uchar i=0; pos<count; ++i)
			{
				Player* pl = target[i];

				if(pl->GetEnergy() && pl != player)
					target[pos++] = pl;
				else
					count--;
			}

			if(count)
			{
				bool possible = m_StatusManager->CalculateHeal(player, target, count);
				if(possible)
				{
					uchar targetIds[PLAYER_MAX];
					for(uint i=0; i<count; ++i)
						targetIds[i] = target[i]->GetId();
					HealMsg healMsg(player->GetId(), count);
					healMsg.SetTargets(targetIds);
					SendMsg(&healMsg);
				}
			}
			success = true;
		}
	}

	ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Ok);
	Server::Instance()->Response(&response, msg->GetSocket());
}

void sv::Game::SendMsg(Msg* msg)
{
	m_TimeLastMsg = 0;
	bool success = Server::Instance()->SendSocketMsg(msg, m_Socket);
	if(! success)
	{
		uint index = 0;
		InputMsg* msg = InputMsgPool::Instance()->GetFreeMsg(index);
		msg->SetContent(m_Id, 0, eContrAction_DeleteGame, 0);
		InputMsgPool::Instance()->SetUnhandled(index);
	}
}

void sv::Game::InitTime()
{
#ifdef WIN32
	LARGE_INTEGER li;
	BOOL success = QueryPerformanceFrequency(&li);
	ASSERT(success, "QueryPerformanceFrequency faled.");
	m_Frequence = double(li.QuadPart)/1000000.0;

    QueryPerformanceCounter(&li);
    m_Time = (long long)(li.QuadPart / m_Frequence);
#else
	timespec time;
	clock_gettime(CLOCK_MONOTONIC, &time);

	m_Time = time.tv_sec * 1000000 + (int)(time.tv_nsec / 1000.0 + 0.5);
#endif
}

ulong sv::Game::GetDeltaTime()
{
	long long newTime;
#ifdef WIN32
	LARGE_INTEGER li;
    QueryPerformanceCounter(&li);

	newTime = (long long)(li.QuadPart / m_Frequence);
#else
	timespec time;
	clock_gettime(CLOCK_MONOTONIC, &time);

	newTime = time.tv_sec * 1000000 + (int)(time.tv_nsec / 1000.0 + 0.5);
#endif

	uint retVal = (uint)(newTime - m_Time);
	m_Time = newTime;
	return retVal;
}