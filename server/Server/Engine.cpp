#include "ServerPCH.h"
#include "Engine.h"

#include "GameManager.h"
#include "Game.h"
#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"

sv::Engine::Engine(void)
{
	m_GameManager = S_NEW GameManager();
}


sv::Engine::~Engine(void)
{
	delete(m_GameManager);
}

void sv::Engine::Run()
{
	/*while(true)
	{
		HandleMsgs();
		GameManager::Instance()->Update();
	}*/

	while(true)
	{
		LOG(DEBUG_GAMELOOP, "Start loop.");
		// Game Loop
		HandleMsgs();
		uchar numGames = m_GameManager->GetSize();
		while(numGames > 0)
		{
			numGames = m_GameManager->GetSize();
			for(uchar i=0; i < numGames; ++i)
			{
				m_GameManager->GetGameByIndex(i)->Update();
				HandleMsgs();
			}
		}

		// Pause
		{
			LOG(DEBUG_GAMELOOP, "Pause start.");
			boost::unique_lock<boost::mutex> lock(m_MutexPaused);
			m_Paused = true;
			while(m_Paused)
			{
				LOG(DEBUG_GAMELOOP, "Pause continue");
				m_ConditionPaused.wait(lock);
			}
			LOG(DEBUG_GAMELOOP, "Pause end.");
		}
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
			Game* game = m_GameManager->CreateGame(msg->GetSocket());
			LOG1(DEBUG_FLOW, "Game created: %i", game->GetId());

			InitMsg initMsg(game->GetId()); 
			Server::Instance()->SendSocketMsg(&initMsg, msg->GetSocket());
			
			LOG1(DEBUG_MSG, "Socket connection %i", game->GetId());
		}
		else if(msg->GetAction() == eContrAction_DeleteGame)
		{
			Game* game = m_GameManager->GetGame(msg->GetChannel());
			if(game)
			{
				LOG1(DEBUG_FLOW, "Game deleted: %i", game->GetId());
				m_GameManager->DeleteGame(game);
			}
		}
		else
		{
			Game* game = m_GameManager->GetGame(msg->GetChannel());
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

void sv::Engine::Continue()
{
	LOG(DEBUG_GAMELOOP, "Call Continue");
	boost::unique_lock<boost::mutex> lock(m_MutexPaused);
	m_Paused = false;
	m_ConditionPaused.notify_all();
	LOG(DEBUG_GAMELOOP, "Call Continue End");
}