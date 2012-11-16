#include "ServerPCH.h"
#include "Game.h"

#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"
#include "PlayerManager.h"
#include "Player.h"
#include "Grid.h"

#ifdef WIN32
#include <Windows.h>
#endif

sv::Game::Game()
: m_TimeLastMsg(0)
, m_Status(eGameStatus_Wait)
, m_Countdown(0)
, m_PlayerManager(0)
, m_Grid(0)
{
	InitTime();
	m_PlayerManager = S_NEW PlayerManager();
	m_Grid = S_NEW Grid();
}

sv::Game::~Game()
{
	delete(m_PlayerManager);
	delete(m_Grid);
}

void sv::Game::Init(uint id, int socket)
{
	m_Id = id;
	m_Socket = socket;

	m_PlayerManager->Restart();
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
				m_Status = eGameStatus_Run;

				uchar playerNumber = m_PlayerManager->GetNumber();
				m_Grid->Init(16);//playerNumber*2);
				m_PlayerManager->Start();

				uchar color[20]; // set to max number or allocate dynamicly
				uchar pos[20]; // set to max number or allocate dynamicly
				m_PlayerManager->GetColors(color);
				m_PlayerManager->GetPos(pos);
				StartMsg startMsg(playerNumber);
				startMsg.SetColors(color);
				startMsg.SetPos(pos);
				SendMsg(&startMsg);
			}
		} break;
		case eGameStatus_Run:
		{
			m_PlayerManager->Update(deltaTime);
		} break;
	}

	m_TimeLastMsg += deltaTime;
	if(m_TimeLastMsg > POLLING_RATE)
	{
		PollingMsg msg;
		SendMsg(&msg);
	}
}

void sv::Game::HandleMsg(sv::InputMsg* msg)
{
	LOG1(DEBUG_MSG, "Action: %i\n", msg->GetAction());
	switch(msg->GetAction())
	{
	case eContrAction_Start:
		{
			if(m_Status != eGameStatus_Run)
			{
				if(m_Status == eGameStatus_Wait)
				{
					m_Countdown = 0;
					m_Status = eGameStatus_Countdown;
					LOG(DEBUG_FLOW, "Countdown started");

					CountdownMsg countdownMsg((uchar)(COUNTDOWN/1000));
					SendMsg(&countdownMsg);
				}
				Player* pl = m_PlayerManager->AddPlayer(m_Grid);
				LOG(DEBUG_FLOW, "Player added");

				ResponseStartMsg response(pl->GetId(), pl->GetColor());
				Server::Instance()->Response(&response, msg->GetSocket());
			}
			else
			{
				ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Failed);
				Server::Instance()->Response(&response, msg->GetSocket());
			}

		} break;
	case eContrAction_Right:
		{
			bool success = false;
			if(m_Status == eGameStatus_Run)
			{
				Player* player = m_PlayerManager->GetPlayer(msg->GetControllerId());
				if(player)
				{
					int pos = player->MoveRigth();
					MoveMsg moveMsg(player->GetId(), pos);
					SendMsg(&moveMsg);

					success = true;
				}
			}
			if(!success)
			{
				ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Failed);
				Server::Instance()->Response(&response, msg->GetSocket());
			}
			else
			{
				ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Ok);
				Server::Instance()->Response(&response, msg->GetSocket());
			}
		} break;
	case eContrAction_Left:
		{
			bool success = false;
			if(m_Status == eGameStatus_Run)
			{
				Player* player = m_PlayerManager->GetPlayer(msg->GetControllerId());
				if(player)
				{
					int pos = player->MoveLeft();
					MoveMsg moveMsg(player->GetId(), pos);
					SendMsg(&moveMsg);

					success = true;
				}
			}
			if(!success)
			{
				ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Failed);
				Server::Instance()->Response(&response, msg->GetSocket());
			}
			else
			{
				ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Ok);
				Server::Instance()->Response(&response, msg->GetSocket());
			}

		} break;
	default:
		{
			ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_Failed);
			Server::Instance()->Response(&response, msg->GetSocket());
		} break;
	}
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