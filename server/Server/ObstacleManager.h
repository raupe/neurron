#ifndef ObstacleManager_h__
#define ObstacleManager_h__

#include "Pool.h"
#include "Obstacle.h"

namespace sv
{
	class Grid;
	class Game;

	class ObstacleManager : private Pool<Obstacle>
	{
	public:
		static Obstacle::Properties		GetProperties(uchar category);

		ObstacleManager(Grid* grid, Game* game);
		~ObstacleManager();

		void							Reset();
		void							Start();
		void							Update(ulong deltaTime);

		void							UpdateLevel(ulong deltaTime);
		Obstacle*						CreateObstacle(uchar category, uchar pos);
	private:
		static const int				s_LevelSize;
		static const char*				s_Level[];

		Grid*							m_Grid;
		Game*							m_Game;
		
		uchar							m_IdCount;
		ulong							m_PassedTime;
		uchar							m_Step;
	};
}

#endif // ObstacleManager_h__

