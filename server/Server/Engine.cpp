#include "ServerPCH.h"
#include "Engine.h"

#include "GameFactory.h"
#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"

sv::Engine::Engine(void)
{
}


sv::Engine::~Engine(void)
{
}

void sv::Engine::Run()
{
	while(true)
	{
		HandleMsgs();
		GameFactory::Instance()->Update();
	}
}

void sv::Engine::HandleMsgs()
{
	std::vector<InputMsg*> msgs;
	std::vector<uint> indecies;
	InputMsgPool::Instance()->GetUnhandledMsgs(msgs, indecies);
	
	for(uint i=0; i<msgs.size(); ++i)
	{
		InputMsg* msg = msgs[i];

		if(msg->GetAction() == eContrAction_CreateGame)
		{
			Game* game = GameFactory::Instance()->CreateGame();
			game->SetSocket(msg->GetSocket());

			// TODO: avoid casting!!!!
			InitMsg initMsg((char)game->GetId()); 
			Server::Instance()->SendSocketMsg(&initMsg, msg->GetSocket());
			
			LOG1(DEBUG_MSG, "Socket connection %i", game->GetId());
		}
		else if(msg->GetAction() == eContrAction_DeleteGame)
		{

		}
		else
		{
			Game* game = GameFactory::Instance()->GetGame(msg->GetChannel());
			if(game)
			{
				game->HandleMsg(msg);
			}
			else
			{
				Server::Instance()->Response((uchar*)"No Game", 6, msg->GetSocket());
			}
		}
	}


	InputMsgPool::Instance()->Free(indecies);
}
