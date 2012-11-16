#include "ServerPCH.h"
#include "Player.h"

sv::Player::Player(uint id, uint color, Grid* grid, uint pos)
: Element(id, grid, pos)
, m_Color(color)
{
}

sv::Player::~Player()
{
}

void sv::Player::Update(ulong deltaTime)
{
	Element::Update(deltaTime);
}