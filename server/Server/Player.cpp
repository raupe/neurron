#include "ServerPCH.h"
#include "Player.h"

sv::Player::Player(uint id, uint color, Grid* grid, uint pos)
: m_Color(color)
{
	Init(id, grid, pos);
}

sv::Player::~Player()
{
}

void sv::Player::Update(ulong deltaTime)
{
	Element::Update(deltaTime);
}