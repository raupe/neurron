#include "ServerPCH.h"
#include "Game.h"

#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"

sv::Game::Game(unsigned int id)
: m_Id(id)
{
}

sv::Game::~Game()
{
}

void sv::Game::Update()
{



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
			Server::Instance()->SendSocketMsg(&initMsg, msg->GetSocket());

			Server::Instance()->Response(0, 0, msg->GetSocket());
		} break;
	}
}