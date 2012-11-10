#ifndef GameFactory_h__
#define GameFactory_h__

#include "Singleton.h"
#include "Game.h"

#include "Pool.h"
#include <vector>

namespace sv
{
	class GameFactory : public Pool<Game>, public Singleton<GameFactory>
	{
	public:
		GameFactory();
		~GameFactory();
		
		Game*	CreateGame();
		Game*	GetGame(uint id);
		void	DeleteGame(unsigned int id);

		void	Update();

	private:
		bool	m_Lock;
		std::vector<Game*> m_Games;
		uchar	m_CountId;
	};
}

#endif

