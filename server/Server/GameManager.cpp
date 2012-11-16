#include "ServerPCH.h"
#include "GameManager.h"

sv::GameManager::GameManager()
: m_CountId(1)
{
	Init(255);
}

sv::GameManager::~GameManager()
{
}

sv::Game* sv::GameManager::CreateGame(int socket)
{
	Game* game = Get();
	game->Init(m_CountId, socket);

	if(m_CountId == 255)
		m_CountId = 1;
	else
		m_CountId++;

	return game;
}

void sv::GameManager::DeleteGame(Game* game)
{
	Free(game);
}


sv::Game* sv::GameManager::GetGame(uchar id)
{
	Pool<Game>::Iterator iter = First();
	while(iter)
	{
		Game* game = Pool<Game>::Get(iter);
		if(game->GetId() == id)
			return game;
		iter = Pool<Game>::Next(iter);
	}

	ASSERT(true, "Error: sv::GameManager::GetGame : game doesn't exist");
	return 0;
}

void sv::GameManager::Update()
{
	Pool<Game>::Iterator iter = First();
	while(iter)
	{
		Game* game = Pool<Game>::Get(iter);
		game->Update();
		iter = Pool<Game>::Next(iter);
	}
}
