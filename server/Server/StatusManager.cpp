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
	Obstacle::Properties prop = Obstacle::GetProperties(obstacle->GetCategory());
	uchar value = prop.m_Value / playerCount;
	uchar energy;
	switch(prop.m_Type)
	{
	case Obstacle::eObstacleType_EnergyDown:
		for(uchar i=0; i<playerCount; ++i)
		{
			energy = player[i]->GetEnergy();
			
			if(energy > prop.m_Value)
				energy -= prop.m_Value;
			else {
				energy = 0;
				player[i]->StartReviveCountdown();

				if(m_Points > PUNISH_POINTS)
				{
					player[i]->AddPoints(-PUNISH_POINTS);
					m_Points -= PUNISH_POINTS;
				}
				else
				{
					player[i]->AddPoints(-m_Points);
					m_Points = 0;
				}
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
		{
			short points;
			for(uchar i=0; i<playerCount; ++i)
			{
				energy = player[i]->GetEnergy();
				points = energy * value / 100;
				player[i]->AddPoints(points);
				m_Points += points;
			}
			LOG1(DEBUG_POINTS, "PointsUp to: %i", m_Points);
		} break;
	}
}

bool sv::StatusManager::CalculateHeal(Player* player, Player* target[], uchar targetCount)
{
	if(player->GetEnergy() <= HEAL_ENERGY)
		return false;

	player->SetEnergy(player->GetEnergy() - HEAL_ENERGY);
	LOG1(DEBUG_POINTS, "Heal: Energy down to: %i", player->GetEnergy());

	uchar value = HEAL_ENERGY / targetCount;
	for(uchar i=0; i<targetCount; ++i)
	{
		target[i]->SetEnergy(target[i]->GetEnergy() + value);
		if(target[i]->GetEnergy() > ENERGY_MAX)
			target[i]->SetEnergy(ENERGY_MAX);
		LOG1(DEBUG_POINTS, "Heal: Energy up to: %i", target[i]->GetEnergy());
	}

	return true;
}