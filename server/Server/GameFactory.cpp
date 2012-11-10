#include "ServerPCH.h"
#include "GameFactory.h"

sv::GameFactory::GameFactory()
: m_CountId(1)
{
	Init(255);
}

sv::GameFactory::~GameFactory()
{
}

sv::Game* sv::GameFactory::CreateGame()
{
	Game* game = Get();
	game->SetId(m_CountId);

	if(m_CountId == 255)
		m_CountId = 1;
	else
		m_CountId++;

	return game;
}

void sv::GameFactory::DeleteGame(unsigned int id)
{
	Game* game = GetGame(id);
	if(game)
		Free(game);
}


sv::Game* sv::GameFactory::GetGame(uint id)
{
	Pool<Game>::Iterator iter = First();
	while(iter)
	{
		Game* game = Pool<Game>::Get(iter);
		if(game->GetId() == id)
			return game;
		iter = Pool<Game>::Next(iter);
	}

	ASSERT(true, "Error: sv::GameFactory::GetGame : game doesn't exist");
	return 0;
}

void sv::GameFactory::Update()
{
	
	Pool<Game>::Iterator iter = First();
	while(iter)
	{
		Game* game = Pool<Game>::Get(iter);
		game->Update();
		iter = Pool<Game>::Next(iter);
	}
}
