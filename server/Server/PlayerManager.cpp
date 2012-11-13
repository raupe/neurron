#include "ServerPCH.h"
#include "PlayerManager.h"

#include "Player.h"

#define COLOR_MAX 10

sv::PlayerManager::PlayerManager()
: m_Color(0)
{
}


sv::PlayerManager::~PlayerManager()
{
	Restart();
}


sv::Player* sv::PlayerManager::AddPlayer()
{
	Player* player = S_NEW Player(m_Player.size()+1, m_Color++);
	if(m_Color == COLOR_MAX)
		m_Color = 0;
	m_Player.push_back(player);
	return 0;
}

sv::Player* sv::PlayerManager::GetPlayer(uint id)
{
	if(id <= m_Player.size())
		return m_Player[id-1];
	return 0;
}

void sv::PlayerManager::Restart()
{
	for(uint i=m_Player.size()-1; i>=0; --i)
		delete(m_Player[i]);
	m_Player.clear();
}

void sv::PlayerManager::Update(ulong deltaTime)
{
	for(uint i=m_Player.size()-1; i>=0; --i)
		m_Player[i]->Update(deltaTime);
}