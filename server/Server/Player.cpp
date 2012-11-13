#include "ServerPCH.h"
#include "Player.h"

#define MOVE_TIME 10000
#define CHANGE_TIME 5000

sv::Player::Player(uint id, uint color)
: m_Id(id)
, m_Color(color)
, m_Pos(0)
, m_NextPos(m_Pos)
, m_PassedTime(0)
, m_Moving(false)
{
}

sv::Player::~Player()
{
}

void sv::Player::Update(ulong deltaTime)
{
	if(m_Moving)
	{
		m_PassedTime += deltaTime;

		if(m_PassedTime > MOVE_TIME)
		{
			m_PassedTime = 0;
			m_Moving = false;
			m_Pos = m_NextPos;
		}
		else if(m_PassedTime > CHANGE_TIME)
		{
			m_Pos = m_NextPos;
		}
	}
}

void sv::Player::SetPos(uint pos)
{ 
	m_Pos = pos;
	m_NextPos = m_Pos;
	m_PassedTime = 0;
}

void sv::Player::SetNextPos(uint pos)
{
	// TODO Queue
	m_NextPos = pos; 
}