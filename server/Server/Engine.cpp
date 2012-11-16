#include "ServerPCH.h"
#include "Engine.h"

#include "GameManager.h"
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
	/*while(true)
	{
		HandleMsgs();
		GameManager::Instance()->Update();
	}*/

	GameManager* manager = GameManager::Instance();
	GameManager::Iterator iter;
	while(true)
	{
		HandleMsgs();

		iter = manager->First();
		while(iter)
		{
			Game* game = manager->Get(iter);
			game->Update();
			iter = manager->Next(iter);
			
			HandleMsgs();
		}
	}
}

void sv::Engine::HandleMsgs()
{
	std::vector<InputMsg*> msgs;
	std::vector<uint> indecies;
	InputMsgPool::Instance()->GetUnhandledMsgs(msgs, indecies);
	GameManager* manager = GameManager::Instance();
	
	for(uint i=0; i<msgs.size(); ++i)
	{
		InputMsg* msg = msgs[i];

		if(msg->GetAction() == eContrAction_CreateGame)
		{
			LOG(DEBUG_FLOW, "Game created");
			Game* game = manager->CreateGame(msg->GetSocket());

			InitMsg initMsg(game->GetId()); 
			Server::Instance()->SendSocketMsg(&initMsg, msg->GetSocket());
			
			LOG1(DEBUG_MSG, "Socket connection %i", game->GetId());
		}
		else if(msg->GetAction() == eContrAction_DeleteGame)
		{
			LOG(DEBUG_FLOW, "Game deleted");
			Game* game = manager->GetGame(msg->GetChannel());
			manager->DeleteGame(game);
		}
		else
		{
			Game* game = manager->GetGame(msg->GetChannel());
			if(game)
			{
				game->HandleMsg(msg);
			}
			else
			{
				ResponseStatusMsg response(ResponseStatusMsg::eResponseStatus_NoGame);
				Server::Instance()->Response(&response, msg->GetSocket());
			}
		}
	}


	InputMsgPool::Instance()->Free(indecies);
}
