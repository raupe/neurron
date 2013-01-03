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
#include "Engine.h"
#include "Highscore.h"

#ifdef WIN32
#include <Windows.h>
#endif

sv::Game::Game()
: m_TimeLastMsg(0)
, m_Status(eGameStatus_Wait)
, m_Duration(0)
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
	m_StatusManager->Reset();
	m_ObstacleManager->Reset();
	m_PlayerManager->Reset();
	m_Grid->Reset();

	m_Id = id;
	m_Socket = socket;
	m_Status = eGameStatus_Wait;
	InitTime();
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
		case eGameStatus_Name:
		{
			m_Duration += deltaTime;
			if(m_Duration > NAME_TIME)
				Abort();
		} break;
		case eGameStatus_Countdown:
		{
			m_Duration += deltaTime;
			if(m_Duration > COUNTDOWN)
				Start();
		} break;
		case eGameStatus_Run:
		{
			m_PlayerManager->Update(deltaTime);
			m_ObstacleManager->Update(deltaTime);
			//m_StatusManager->Update(deltaTime);

			m_Duration += deltaTime;
			if(m_Duration >= PLAY_TIME)
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

void sv::Game::StartName()
{
	LOG(DEBUG_FLOW, "Naming started");

	m_Duration = 0;
	m_Status = eGameStatus_Name;

	NameMsg nameMsg;
	SendMsg(&nameMsg);
}

void sv::Game::StartCountdown()
{
	LOG(DEBUG_FLOW, "Countdown started");

	m_Duration = 0;
	m_Status = eGameStatus_Countdown;

	CountdownMsg countdownMsg((uchar)(COUNTDOWN/1000000), m_Name);
	SendMsg(&countdownMsg);
}

void sv::Game::Start()
{
	LOG(DEBUG_FLOW, "Game started.");

	m_Status = eGameStatus_Run;
	m_Duration = 0;
	
	uchar playerNumber = m_PlayerManager->GetNumber();

	m_Grid->Start(playerNumber);
	m_PlayerManager->Start();
	m_ObstacleManager->Start();

	uchar pos[PLAYER_MAX];
	m_PlayerManager->GetPos(pos);
	StartMsg startMsg(playerNumber, m_Grid->GetNumberLanes());
	startMsg.SetPos(pos);
	SendMsg(&startMsg);
}

void sv::Game::End()
{
	LOG(DEBUG_FLOW, "Game ended.");
	m_Status = eGameStatus_Wait;
	ushort points = m_StatusManager->GetPoints();

	Highscore* highscore = Engine::Instance()->GetHighscore();
	if(!m_Name.empty() && points)
	{
		highscore->AddScore(m_PlayerManager->GetNumber(), points, m_Name);
	}

	EndMsg endMsg(points);

	uchar playerNum = m_PlayerManager->GetNumber();
	ushort playerPointsSum = 0;
	short playerPoints;
	for(uchar i=0; i<playerNum; ++i)
	{
		playerPoints =  m_PlayerManager->GetPlayer(i+1)->GetPoints();
		playerPointsSum += playerPoints > 0 ? playerPoints : 0;
	}

	Player* pl;
	if(playerPointsSum > 0)
	{
		for(uchar i=0; i<playerNum; ++i)
		{
			pl = m_PlayerManager->GetPlayer(i+1);
			endMsg.SetPercent(i,pl->GetColor(), pl->GetPoints() > 0 ? (uchar)((pl->GetPoints() * 1000 / playerPointsSum + 5) / 10) : 0);
		}
	}
	else
	{
		uchar percent = (1000 / playerNum + 5) / 10;
		for(uchar i=0; i<playerNum; ++i)
		{
			pl = m_PlayerManager->GetPlayer(i+1);
			endMsg.SetPercent(i,pl->GetColor(), percent);
		}
	}

	for(uchar i=0; i<3; ++i)
	{
		std::string name = highscore->GetName(playerNum, i);
		endMsg.SetHighscore(i, name, highscore->GetScore(playerNum, i));
	}

	SendMsg(&endMsg);

	m_Name = "";
	m_Grid->Reset();
	m_PlayerManager->Reset();
	m_ObstacleManager->Reset();
	m_StatusManager->Reset();
}

void sv::Game::Abort()
{
	LOG(DEBUG_FLOW, "Abort.");
	m_Status = eGameStatus_Wait;
	AbortMsg abortMgs;
	SendMsg(&abortMgs);

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
	case eContrAction_Name:
		HandleNameMsg(msg);
		break;
	case eContrAction_Abort:
		Abort();
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
			ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Ok);
			Server::Instance()->Response(&response, msg->GetSocket());
		} break;
	}
}

void sv::Game::HandleStartMsg(InputMsg* msg)
{
	Player* pl = 0;
	if(m_Status != eGameStatus_Run)
	{
		pl = m_PlayerManager->AddPlayer();
		if(pl)
		{
			bool enterName = false;
			if( m_Status == eGameStatus_Wait)
			{
				GetDeltaTime();
				StartName();
				enterName = true;
			}
			
			JoinMsg joinMsg(pl->GetId(), pl->GetColor());
			SendMsg(&joinMsg);
			
			ResponseStartMsg response(pl->GetId(), pl->GetColor(), enterName);
			Server::Instance()->Response(&response, msg->GetSocket());
		}
	}

	if(!pl)
	{
		ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_AlreadyRunning);
		Server::Instance()->Response(&response, msg->GetSocket());
	}
}


void sv::Game::HandleNameMsg(InputMsg* msg)
{
	if(m_Status == eGameStatus_Wait || m_Status == eGameStatus_Countdown)
	{
		ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_NotRunning);
		Server::Instance()->Response(&response, msg->GetSocket());
		return;
	}

	if(m_Status == eGameStatus_Run)
	{
		ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_AlreadyRunning);
		Server::Instance()->Response(&response, msg->GetSocket());
		return;
	}

	{
		if(msg->GetData())
			m_Name = std::string((char*) msg->GetData());

		LOG1(DEBUG_FLOW, "Name: %s", m_Name.c_str());

		StartCountdown();
	
		ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Ok);
		Server::Instance()->Response(&response, msg->GetSocket());
	}
}

void sv::Game::HandleMoveMsg(InputMsg* msg, uchar dir)
{
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
			uchar pos;
			if(player->Move(dir, pos))
			{
				MoveMsg moveMsg(player->GetId(), pos);
				SendMsg(&moveMsg);
			}
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