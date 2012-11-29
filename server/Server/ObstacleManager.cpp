#include "ServerPCH.h"
#include "ObstacleManager.h"

#include "Grid.h"
#include "Game.h"
#include "Msg.h"
#include "StatusManager.h"
#include "Player.h"

const int sv::ObstacleManager::s_LevelSize = 10;
const char* sv::ObstacleManager::s_Level[s_LevelSize] = 
{
//a - ein Feld, 1, Energie minus 10%, rot
//b - ein Feld, 1, Energie plus 10%, gr�n
//c - ein Feld, 1, Punkte plus 100, gelb
//d - ein Feld, 1, Punkte plus 50, gelb

//  0         10        20
//  012345678901234567890
/*	"a   a           ",
	"a   a           ",
	"                ",
	" a   a a        ",
	" a   a a        ",
	"                ",
	"aaaaaaaa        ",
	"a      a        ",
	"aaaaaaaa        ",
	"                ",
	/*/
	"                ",
	"                ",
	"a               ",
	" b              ",
	"  c             ",
	"   d            ",
	"                ",
	"                ",
	"                ",
	"                ",//*/
};

sv::Obstacle::Properties sv::ObstacleManager::GetProperties(uchar category)
{
	Obstacle::Properties prop;
	switch(category)
	{
	case 1:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyDown;
			prop.m_Value = 10;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 2:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyUp;
			prop.m_Value = 10;
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

sv::ObstacleManager::ObstacleManager(Game* game)
: Manager(game)
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

	Pool<Obstacle>::FreeAll();
	Pool<Obstacle>::Clear();
}

void sv::ObstacleManager::Start()
{
	Pool<Obstacle>::Init(80);
}

void sv::ObstacleManager::Update(ulong deltaTime)
{
	Iterator iter = First();
	while(iter)
	{
		Obstacle* obstacle = Get(iter);
		iter = Next(iter);

		obstacle->Update(deltaTime);
		if( GetGrid()->IsEdge(obstacle->GetPos()) )
		{
			HandleCollision(obstacle);
			obstacle->Reset();
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

		for(uchar i=0; i<GetGrid()->GetNumberLanes(); ++i)
		{
			if(s_Level[m_Step][i] != ' ')
				CreateObstacle(s_Level[m_Step][i] - 'a' +1, i);
		}
	}
}

sv::Obstacle* sv::ObstacleManager::CreateObstacle(uchar category, uchar lane)
{
	Obstacle* obstacle = Get();
	Obstacle::Properties prop = GetProperties(category);
	uchar pos = GetGrid()->GetInnerPos(lane);
	obstacle->Init(m_IdCount, GetGrid(), prop);
	obstacle->Start(pos);

	LOG2(DEBUG_OBSTACLES, "Obstacle created: id: %i, pos: %i", m_IdCount, pos);

	ObstacleMsg obstacleMsg(m_IdCount, category, pos);
	GetGame()->SendMsg(&obstacleMsg);

	if(m_IdCount == 255)
		m_IdCount = 1;
	else
		m_IdCount++;

	return obstacle;
}

void sv::ObstacleManager::HandleCollision(Obstacle* obstacle)
{
	Player* player[PLAYER_MAX];
	uchar count = 0;
	GetGrid()->GetPlayer(obstacle->GetPos(), player, count);

	if(count)
	{
		uchar playerIds[PLAYER_MAX];
		for(uint i=0; i<count; ++i)
			playerIds[i] = player[i]->GetId();
		CollisionMsg collisionMsg(obstacle->GetId(), count);
		collisionMsg.SetPlayer(playerIds);
		GetGame()->SendMsg(&collisionMsg);

		GetStatusManager()->CalculateCollision(obstacle, player, count);
		LOG1(DEBUG_OBSTACLES, "Collision: id %i", obstacle->GetId());
	}
}