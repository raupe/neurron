#include "ServerPCH.h"
#include "GameFactory.h"

sv::GameFactory::GameFactory()
{
	// TEST
	CreateGame();
}

sv::GameFactory::~GameFactory()
{
	for (unsigned int i=0; i < m_Games.size(); ++i)
	{
		if(m_Games[i])
		{
			delete(m_Games[i]);
			m_Games[i] = 0;
		}
	}
}

sv::Game* sv::GameFactory::CreateGame()
{
	unsigned int id = 0;
	
	for (unsigned int i=0; i < m_Games.size(); ++i)
	{
		if (! m_Games[i])
		{
			id = i + 1;
			break;
		}
	}

	if(id == 0)
	{
		id = m_Games.size();
		uint size = id == 0 ? 1 : 2*id;
		m_Games.resize(size, 0);

		id++;
	}
	
	Game* game = S_NEW Game(id);
	m_Games[id - 1] = game;

	return game;
}

void sv::GameFactory::EndGame(unsigned int id)
{
	Game* game = m_Games[id - 1];
	if(game)
		delete(game);
	m_Games[id - 1] = 0;
}


sv::Game* sv::GameFactory::GetGame(uint id)
{
	if(id <= m_Games.size() && id > 0)
	{
		Game* retVal = m_Games[id - 1];
		if(retVal && retVal->GetId() == id)
			return retVal;
	}
	ASSERT(true, "Error: sv::GameFactory::GetGame : game doesn't exist");
	return 0;
}

void sv::GameFactory::Update()
{
	for (unsigned int i=0; i < m_Games.size(); ++i)
	{
		if (m_Games[i])
		{
			m_Games[i]->Update();
		}
	}
}
