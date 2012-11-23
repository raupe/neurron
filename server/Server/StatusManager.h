#ifndef StatusManager_h__
#define StatusManager_h__

#include "Manager.h"

namespace sv
{
	class Obstacle;
	class Player;

	class StatusManager : public Manager
	{
	public:
		StatusManager(Game* game);
		~StatusManager();
		
		virtual void		Reset();
		virtual void		Start();
		virtual void		Update(ulong deltaTime) {}

		void		CalculateCollision(Obstacle* obstacle, Player* player[], uchar playerCount);

	private:
		short		m_Points;
	};
}

#endif

