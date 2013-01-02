#include "ServerPCH.h"
#include "Engine.h"

#include "GameManager.h"
#include "Game.h"
#include "InputMsg.h"
#include "Msg.h"
#include "Server.h"
#include "Highscore.h"

sv::Engine::Engine()
{	
	m_Highscore = S_NEW Highscore();
	m_GameManager = S_NEW GameManager();

#ifdef WIN32
	GetModuleFileName(0, m_ExePath, sizeof(m_ExePath));
#else
	readlink("/proc/self/exe", m_ExePath, sizeof(m_ExePath));
#endif

	int pos = strlen(m_ExePath) - 1;
	while(pos >= 0 && m_ExePath[pos] != '/' && m_ExePath[pos] != '\\')
		pos--;
	m_ExePath[pos+1] = 0;
}

void sv::Engine::GetPath(const char* relPath, char* pathOut, uint bufferSize)
{
#ifdef WIN32
	sprintf_s(pathOut, bufferSize, "%s%s", m_ExePath, relPath);
#else
	sprintf(pathOut, "%s%s", m_ExePath, relPath);
#endif
}

sv::Engine::~Engine()
{
	delete(m_GameManager);
	delete(m_Highscore);
}

void sv::Engine::Run()
{
	m_Highscore->LoadHighscore();

	while(true)
	{
		LOG(DEBUG_GAMELOOP, "Start loop.");
		// Game Loop
		HandleMsgs();
		uchar runningGames = m_GameManager->GetSize();
		while(runningGames > 0)
		{
			uchar numGames = m_GameManager->GetSize();
			runningGames = 0;
			for(uchar i=0; i < numGames; ++i)
			{
				Game* game = m_GameManager->GetGameByIndex(i);
				game->Update();
				if(game->IsRunning())
					runningGames++;

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
	boost::unique_lock<boost::mutex> lock(m_MutexPaused);
	m_Paused = false;
	m_ConditionPaused.notify_all();
}