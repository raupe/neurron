#include "ServerPCH.h"
#include "ObstacleManager.h"

#include "Grid.h"
#include "Game.h"
#include "Msg.h"

const int sv::ObstacleManager::s_LevelSize = 10;
const char* sv::ObstacleManager::s_Level[s_LevelSize] = 
{
//a - ein Feld, 1, Energie minus 10%, rot
//b - ein Feld, 1, Energie plus 10%, grün
//c - ein Feld, 1, Punkte plus 100, gelb
//d - ein Feld, 1, Punkte plus 50, gelb

//  0         10        20
//  012345678901234567890
	"a   a           ",
	"a   a           ",
	"                ",
	" a   a a        ",
	" a   a a        ",
	"                ",
	"aaaaaaaa        ",
	"a      a        ",
	"aaaaaaaa        ",
	"                ",
};

sv::Obstacle::Properties sv::ObstacleManager::GetProperties(uchar category)
{
	Obstacle::Properties prop;
	switch(category)
	{
	case 0:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyDown;
			prop.m_Value = 10;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 1:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyUp;
			prop.m_Value = 10;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 2:
		{
			prop.m_Type = Obstacle::eObstacleType_PointsUp;
			prop.m_Value = 100;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 3:
		{
			prop.m_Type = Obstacle::eObstacleType_PointsUp;
			prop.m_Value = 50;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	}
	return prop;
}

sv::ObstacleManager::ObstacleManager(Grid* grid, Game* game)
: m_Grid(grid)
, m_Game(game)
, m_IdCount(1)
, m_PassedTime(0)
, m_Step(0)
{
}


sv::ObstacleManager::~ObstacleManager()
{
}

void sv::ObstacleManager::Reset()
{
	m_IdCount = 1;
	m_Step = 0;
	m_PassedTime = 0;
	FreeAll();
	Clear();
}

void sv::ObstacleManager::Start()
{
	Init(160);
}

void sv::ObstacleManager::Update(ulong deltaTime)
{
	Iterator iter = First();
	while(iter)
	{
		Obstacle* obstacle = Get(iter);
		iter = Next(iter);

		obstacle->Update(deltaTime);
		if( m_Grid->IsEdge(obstacle->GetPos()) )
		{
			//TODO collision

			Free(obstacle);
		}
	}

	UpdateLevel(deltaTime);
}

void sv::ObstacleManager::UpdateLevel(ulong deltaTime)
{
	m_PassedTime += deltaTime;
	if(m_PassedTime > MOVE_TIME)
	{
		m_PassedTime -= MOVE_TIME;
		m_Step ++;
		if(m_Step == s_LevelSize)
			m_Step = 0;

		for(uchar i=0; i<m_Grid->GetNumberLanes(); ++i)
		{
			if(s_Level[m_Step][i] != ' ')
				CreateObstacle(s_Level[m_Step][i] - 'a', i);
		}
	}
}

sv::Obstacle* sv::ObstacleManager::CreateObstacle(uchar category, uchar lane)
{
	LOG2(DEBUG_OBSTACLES, "Obstacle created: category: %i, lane: %i", category, lane);

	Obstacle* obstacle = Get();
	Obstacle::Properties prop = GetProperties(category);
	uchar pos = m_Grid->GetInnerPos(lane);
	obstacle->Init(m_IdCount, m_Grid, pos, prop);

	ObstacleMsg obstacleMsg(m_IdCount, category, pos);
	m_Game->SendMsg(&obstacleMsg);

	if(m_IdCount == 255)
		m_IdCount = 1;
	else
		m_IdCount++;

	return obstacle;
}
