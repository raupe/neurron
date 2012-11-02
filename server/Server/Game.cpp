#include "ServerPCH.h"
#include "Game.h"

#include "ControllerMsg.h"
#include "Server.h"

sv::Game::Game(unsigned int id)
: m_Id(id)
{
	m_Msgs = S_NEW ControllerMsgPool();
}

sv::Game::~Game()
{
	delete (m_Msgs);
}

void sv::Game::Update()
{
	HandleMsgs();



}

void sv::Game::HandleMsgs()
{
	std::vector<ControllerMsg*> msgs;
	std::vector<uint> indecies;
	m_Msgs->GetUnhandledMsgs(msgs, indecies);
	
	for(uint i=0; i<msgs.size(); ++i)
	{
		ControllerMsg* msg = msgs[i];
		LOG1(DEBUG_MSG, "Action: %i\n", msg->GetAction());


		HandleMsg(msg);
	}


	m_Msgs->Free(indecies);
}

void sv::Game::HandleMsg(sv::ControllerMsg* msg)
{
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
			char response[] = "Hello";
			Server::Instance()->SendMsg(response, sizeof(response),m_Socket);

			Server::Instance()->Response(0, 0, msg->GetSocket());
		} break;
	}
}