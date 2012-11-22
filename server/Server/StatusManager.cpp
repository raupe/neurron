#include "ServerPCH.h"
#include "StatusManager.h"

#include "Obstacle.h"
#include "Player.h"

sv::StatusManager::StatusManager(Game* game)
: Manager(game)
, m_Points(0)
{
}


sv::StatusManager::~StatusManager()
{
}

void sv::StatusManager::Reset()
{
	m_Points = 0;
}

void sv::StatusManager::Start()
{
}

void sv::StatusManager::CalculateCollision(Obstacle* obstacle, Player* player[], uchar playerCount)
{
	uchar value = obstacle->GetValue() / playerCount;
	uchar energy;
	switch(obstacle->GetType())
	{
	case Obstacle::eObstacleType_EnergyDown:
		for(uchar i=0; i<playerCount; ++i)
		{
			energy = player[i]->GetEnegery();
			
			if(energy > obstacle->GetValue())
				energy -= obstacle->GetValue();
			else {
				energy = ENERGY_MAX;
				m_Points -= PUNISH_POINTS;
				if(m_Points < 0)
					m_Points = 0;
			}

			player[i]->SetEnergy(energy);
		}
		break;
	case Obstacle::eObstacleType_EnergyUp:
		for(uchar i=0; i<playerCount; ++i)
		{
			energy = player[i]->GetEnegery() + value;
			if(energy > ENERGY_MAX)
				energy = ENERGY_MAX;

			player[i]->SetEnergy(energy);
		}
		break;
	case Obstacle::eObstacleType_PointsUp:
		for(uchar i=0; i<playerCount; ++i)
		{
			energy = player[i]->GetEnegery();
			m_Points += energy * value;
		}
		break;
	}
}