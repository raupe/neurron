#ifndef PlayerManager_h__
#define PlayerManager_h__

#include <vector>

namespace sv
{
	class Player;

	class PlayerManager
	{
	public:
		PlayerManager();
		~PlayerManager();

		Player*					AddPlayer();
		Player*					GetPlayer(uint id);
		void					Restart();

		void					Update(ulong deltaTime);
	private:
		std::vector<Player*>	m_Player;
		uint					m_Color;
	};
}

#endif // PlayerManager_h__