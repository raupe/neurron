#include "ServerPCH.h"
#include "Obstacle.h"

#include "Grid.h"

sv::Obstacle::Obstacle()
{
}


sv::Obstacle::~Obstacle()
{
}

void sv::Obstacle::Init(uchar id, Grid* grid, uchar pos, Properties properties)
{
	Element::Init(id, grid, pos);
	m_Properties = properties;
}

void sv::Obstacle::Update(ulong deltaTime)
{
	if(! m_Moving)
	{
		MoveOut();
	}
	Element::Update(deltaTime);
}