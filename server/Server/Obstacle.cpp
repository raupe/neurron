#include "ServerPCH.h"
#include "Obstacle.h"

#include "Grid.h"

sv::Obstacle::Properties sv::Obstacle::GetProperties(uchar category)
{
	Obstacle::Properties prop;
	switch(category)
	{
	case 1:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyDown;
			prop.m_Value = 20;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 2:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyUp;
			prop.m_Value = 40;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 3:
		{
			prop.m_Type = Obstacle::eObstacleType_PointsUp;
			prop.m_Value = 100;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 4:
		{
			prop.m_Type = Obstacle::eObstacleType_PointsUp;
			prop.m_Value = 50;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	}
	return prop;
}

sv::Obstacle::Obstacle()
{
}

sv::Obstacle::~Obstacle()
{
}

void sv::Obstacle::Init(uchar id, Grid* grid, uchar category)
{
	Element::Init(id, grid);
	m_Category = category;
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