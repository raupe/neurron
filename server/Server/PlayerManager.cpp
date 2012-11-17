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
	Reset();
}


sv::Player* sv::PlayerManager::AddPlayer(Grid* grid)
{
	//TODO test for max player number
	uint id = m_Player.size()+1;
	Player* player = S_NEW Player(id, m_Color++, grid, id*2);
	if(m_Color == COLOR_MAX)
		m_Color = 0;
	m_Player.push_back(player);
	return player;
}

sv::Player* sv::PlayerManager::GetPlayer(uint id)
{
	if(id > 0 && id <= m_Player.size())
		return m_Player[id-1];
	return 0;
}

void sv::PlayerManager::Reset()
{
	for(int i=m_Player.size()-1; i>=0; --i)
		delete(m_Player[i]);
	m_Player.clear();

	m_Color = 0;
}

void sv::PlayerManager::Start()
{
	for(int i=m_Player.size()-1; i>=0; --i)
		m_Player[i]->Start();
}

void sv::PlayerManager::Update(ulong deltaTime)
{
	for(int i=m_Player.size()-1; i>=0; --i)
		m_Player[i]->Update(deltaTime);
}

uchar sv::PlayerManager::GetNumber()
{
	return (uchar) m_Player.size();
}

void sv::PlayerManager::GetColors(uchar* colors)
{
	for(int i=m_Player.size()-1; i>=0; --i)
		colors[i] = m_Player[i]->GetColor();
}

void sv::PlayerManager::GetPos(uchar* pos)
{
	for(int i=m_Player.size()-1; i>=0; --i)
		pos[i] = m_Player[i]->GetPos();
}