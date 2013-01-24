#ifndef ObstacleManager_h__
#define ObstacleManager_h__

#include "Manager.h"

#include "Pool.h"
#include "Obstacle.h"

namespace sv
{
	class Grid;
	class Game;
	class StatusManager;

	class ObstacleManager : public Manager, private Pool<Obstacle>
	{
	public:
		ObstacleManager(Game* game);
		~ObstacleManager();

		void							Reset();
		void							Start();
		void							Update(ulong deltaTime);

		void							UpdateLevel(ulong deltaTime);
	private:
//		static const int				s_LevelSize;
//		static const char*				s_Level[];

		void							ParseLevel();
		uint							m_LevelSize;
		char**							m_Level;

		Obstacle*						CreateObstacle(uchar category, uchar pos);
		void							DeleteObstacle(Obstacle* obstacle);
		void							HandleCollision(Obstacle* obstacle);
		
		uchar							m_IdCount;
		ulong							m_PassedTime;
		uchar							m_Step;
	};
}

#endif // ObstacleManager_h__

