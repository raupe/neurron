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
			energy = player[i]->GetEnergy();
			
			if(energy > obstacle->GetValue())
				energy -= obstacle->GetValue();
			else {
				energy = 0;
				player[i]->StartReviveCountdown();

				if(m_Points > PUNISH_POINTS)
					m_Points -= PUNISH_POINTS;
				else
					m_Points = 0;
				LOG1(DEBUG_POINTS, "PointsDown to: %i", m_Points);
			}

			player[i]->SetEnergy(energy);
			LOG1(DEBUG_POINTS, "EnergyDown to: %i", energy);
		}
		break;
	case Obstacle::eObstacleType_EnergyUp:
		for(uchar i=0; i<playerCount; ++i)
		{
			energy = player[i]->GetEnergy() + value;
			if(energy > ENERGY_MAX)
				energy = ENERGY_MAX;

			player[i]->SetEnergy(energy);
			LOG1(DEBUG_POINTS, "EnergyUp to: %i", energy);
		}
		break;
	case Obstacle::eObstacleType_PointsUp:
		for(uchar i=0; i<playerCount; ++i)
		{
			energy = player[i]->GetEnergy();
			m_Points += energy * value / 100;
		}
		LOG1(DEBUG_POINTS, "PointsUp to: %i", m_Points);
		break;
	}
}