#include "ServerPCH.h"
#include "GameManager.h"

#include "Game.h"
#include <string.h>

sv::GameManager::GameManager()
: m_CountId(1)
, m_Games(0)
, m_UsedSize(0)
, m_AllocSize(2)
{
	m_Games = static_cast<Game**>( malloc(m_AllocSize * sizeof(Game*)) );
}

sv::GameManager::~GameManager()
{
	for(uint i=0; i<m_UsedSize; ++i)
		delete(m_Games[i]);
	free(m_Games);
}

sv::Game* sv::GameManager::CreateGame(int socket)
{
	Game* game = S_NEW Game();
	game->Init(m_CountId, socket);

	if(m_CountId == 255)
		m_CountId = 1;
	else
		m_CountId++;

	if(m_UsedSize == m_AllocSize)
	{
		m_AllocSize *= 2;
		m_Games = static_cast<Game**>( realloc(m_Games, m_AllocSize * sizeof(Game*)) );
	}

	m_Games[m_UsedSize++] = game;
	return game;
}

void sv::GameManager::DeleteGame(Game* game)
{
	for(uint i=0; i<m_UsedSize; ++i)
	{
		if(m_Games[i] == game)
		{
			m_Games[i] = m_Games[--m_UsedSize];
			delete(game);
			break;
		}
	}
}

sv::Game* sv::GameManager::GetGameByIndex(uchar index)
{
	return m_Games[index];
}


sv::Game* sv::GameManager::GetGame(uchar id)
{
	for(uint i=0; i<m_UsedSize; ++i)
	{
		if(m_Games[i]->GetId() == id)
		{
			return m_Games[i];
		}
	}

	ASSERT(true, "Error: sv::GameManager::GetGame : game doesn't exist");
	return 0;
}

void sv::GameManager::Update()
{
	for(uint i=0; i<m_UsedSize; ++i)
		m_Games[i]->Update();
}
