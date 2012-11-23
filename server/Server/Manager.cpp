#include "ServerPCH.h"
#include "Manager.h"

#include "Game.h"

sv::Manager::Manager(Game* game)
: m_Game(game)
{
}


sv::Manager::~Manager()
{
}

sv::Game* sv::Manager::GetGame()
{ 
	return m_Game;
}

sv::PlayerManager* sv::Manager::GetPlayerManager()
{
	return m_Game->GetPlayerManager();
}

sv::ObstacleManager* sv::Manager::GetObstacleManager()
{
	return m_Game->GetObstacleManager();
}

sv::StatusManager* sv::Manager::GetStatusManager()
{
	return m_Game->GetStatusManager();
}

sv::Grid* sv::Manager::GetGrid()
{
	return m_Game->GetGrid();
}