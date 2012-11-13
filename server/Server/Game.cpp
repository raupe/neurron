#include "ServerPCH.h"
#include "Game.h"

#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"

#ifdef WIN32
#include <Windows.h>
#endif

#define POLLING_RATE 5000000

sv::Game::Game()
: m_TimeLastMsg(0)
, m_Status(eGameStatus_Waiting)
{
	InitTime();
}

sv::Game::~Game()
{
}

void sv::Game::Update()
{
	uint deltaTime = GetDeltaTime();
	LOG1(DEBUG_TIME, "passed time in microsec: %d\n", deltaTime);

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
			ResponseStartMsg response(1, 1);
			Server::Instance()->Response(&response, msg->GetSocket());
		} break;
	case eContrAction_Right:
		{

		} //break;
	case eContrAction_Left:
		{

		} //break;
	default:
		{
			MoveMsg initMsg(msg->GetAction()); 
			SendMsg(&initMsg);

			ResponseOkMsg response;
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