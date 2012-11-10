#include "ServerPCH.h"
#include "Game.h"

#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"

#ifdef WIN32
#include <Windows.h>
#endif

sv::Game::Game()
{
	InitTime();
}

sv::Game::~Game()
{
}

void sv::Game::Update()
{
	LOG1(DEBUG_TIME, "passed time in millisec: %d\n", GetDeltaTime());


}

void sv::Game::HandleMsg(sv::InputMsg* msg)
{
	LOG1(DEBUG_MSG, "Action: %i\n", msg->GetAction());
	switch(msg->GetAction())
	{
	case eContrAction_Start:
		{
			uchar response[2];
			response[0] = 'a'; // id
			response[1] = 'b'; // id

			Server::Instance()->Response(response, sizeof(response), msg->GetSocket());
		} break; 
	default:
		{
			MoveMsg initMsg(msg->GetAction()); 
			Server::Instance()->SendSocketMsg(&initMsg, m_Socket);

			Server::Instance()->Response(0, 0, msg->GetSocket());
		} break;
	}
}

void sv::Game::InitTime()
{
#ifdef WIN32
	LARGE_INTEGER li;
	BOOL success = QueryPerformanceFrequency(&li);
	ASSERT(success, "QueryPerformanceFrequency faled.");
	m_Frequence = double(li.QuadPart)/1000.0;

    QueryPerformanceCounter(&li);
    m_Time = li.QuadPart;
#else
	clock_gettime(CLOCK_MONOTONIC, &m_Time);
#endif
}

int sv::Game::GetDeltaTime()
{
	int retVal = 0;
#ifdef WIN32
	LARGE_INTEGER li;
    QueryPerformanceCounter(&li);

	retVal = (int)((li.QuadPart - m_Time)/m_Frequence + 0.5);
	m_Time = li.QuadPart;
#else
	clock_gettime(CLOCK_MONOTONIC, &temp);
	if(temp.tv_nsec < temp.tv_nsec)
	{
		retVal = (temp.tv_sec - m_Time.tv_sec - 1) * 1000 
			+ (int)((1000000000 + temp.tv_nsec - m_Time.tv_nsec)/1000000.0 + 0.5);
	}
	else
	{
		retVal = (temp.tv_sec - m_Time.tv_sec) * 1000 
			+ (int)((temp.tv_nsec - m_Time.tv_nsec)/1000000.0 + 0.5);
	}
	m_Time = temp;
#endif
	return retVal;
}