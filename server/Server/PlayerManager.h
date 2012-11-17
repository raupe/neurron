#ifndef PlayerManager_h__
#define PlayerManager_h__

#include <vector>

namespace sv
{
	class Player;
	class Grid;

	class PlayerManager
	{
	public:
		PlayerManager();
		~PlayerManager();

		Player*					AddPlayer(Grid* grid);
		Player*					GetPlayer(uint id);

		void					Reset();
		void					Start();
		void					Update(ulong deltaTime);

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