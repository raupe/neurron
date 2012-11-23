#ifndef PlayerManager_h__
#define PlayerManager_h__

#include "Manager.h"

#include <vector>

namespace sv
{
	class Player;
	class Grid;

	class PlayerManager : public Manager
	{
	public:
		PlayerManager(Game* game);
		~PlayerManager();

		virtual void			Reset();
		virtual void			Start();
		virtual void			Update(ulong deltaTime);

		Player*					AddPlayer();
		Player*					GetPlayer(uint id);

		// for Msgs
		uchar					GetNumber();
		void					GetColors(uchar* colors);
		void					GetPos(uchar* pos);
	private:
		std::vector<Player*>	m_Player;
		uint					m_Color;
	};
}

#endif // PlayerManager_h__