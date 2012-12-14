#include "ServerPCH.h"
#include "Obstacle.h"

#include "Grid.h"

sv::Obstacle::Obstacle()
{
}


sv::Obstacle::~Obstacle()
{
}

void sv::Obstacle::Init(uchar id, Grid* grid, Properties properties)
{
	Element::Init(id, grid);
	m_Properties = properties;
}

void sv::Obstacle::Reset()
{
	Element::Reset();
}

void sv::Obstacle::Start(uchar pos)
{
	Element::Start(pos);
}

void sv::Obstacle::Update(ulong deltaTime)
{
	if(! m_Moving)
	{
		uchar pos;
		Move(Grid::eDir_Out, pos);
	}
	Element::Update(deltaTime);
}

bool sv::Obstacle::IsEdge()
{
	return m_PassedTime > GetChangeTime() && m_Grid->IsEdge(m_Pos);
}