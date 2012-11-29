#include "ServerPCH.h"
#include "Player.h"

#include "Grid.h"

sv::Player::Player()
: m_Color(0)
, m_Energy(ENERGY_MAX)
, m_ReviveCountdown(0)
{
}

sv::Player::~Player()
{
}

void sv::Player::Init(uchar id, Grid* grid, uchar color)
{
	Element::Init(id, grid);
	m_Color = color;
}

void sv::Player::Reset()
{
	m_ReviveCountdown = 0;
	m_Energy = ENERGY_MAX;
	Element::Reset();
}

void sv::Player::Start(uchar pos)
{
	Element::Start(pos);
	m_Grid->AddPlayer(m_Pos, this);
}

void sv::Player::Update(ulong deltaTime)
{
	if(m_ReviveCountdown > 0)
	{
		m_ReviveCountdown -= deltaTime;
		if(m_ReviveCountdown < 0)
		{
			m_ReviveCountdown = 0;
			m_Energy = ENERGY_MAX;
		}
	}
	Element::Update(deltaTime);
}

void sv::Player::SetPos(uchar pos)
{
	m_Grid->RemovePlayer(m_Pos, this);
	Element::SetPos(pos);
	m_Grid->AddPlayer(m_Pos, this);
}

void sv::Player::StartReviveCountdown()
{
	m_ReviveCountdown = REVIVE_TIME;
}