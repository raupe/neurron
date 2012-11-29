#include "ServerPCH.h"
#include "PlayerManager.h"

#include "Player.h"
#include "Grid.h"

#define COLOR_MAX 10

sv::PlayerManager::PlayerManager(Game* game)
: Manager(game)
, m_Color(1)
{
}


sv::PlayerManager::~PlayerManager()
{
	Reset();
}

void sv::PlayerManager::Reset()
{
	for(int i=m_Player.size()-1; i>=0; --i)
		delete(m_Player[i]);
	m_Player.clear();

	m_Color = 1;
}

void sv::PlayerManager::Start()
{
	for(int i=m_Player.size()-1; i>=0; --i)
	{
		uchar pos = GetGrid()->GetStartPos(m_Player[i]->GetId());
		m_Player[i]->Start(pos);
	}
}

void sv::PlayerManager::Update(ulong deltaTime)
{
	for(int i=m_Player.size()-1; i>=0; --i)
		m_Player[i]->Update(deltaTime);
}


sv::Player* sv::PlayerManager::AddPlayer()
{
	uint id = m_Player.size()+1;
	if(id == PLAYER_MAX)
		return 0;

	Player* player = S_NEW Player();
	player->Init(id, GetGrid(), m_Color++);
	m_Player.push_back(player);

	if(m_Color == COLOR_MAX)
		m_Color = 1;
	return player;
}

sv::Player* sv::PlayerManager::GetPlayer(uint id)
{
	if(id > 0 && id <= m_Player.size())
		return m_Player[id-1];
	return 0;
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