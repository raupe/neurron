#ifndef GameFactory_h__
#define GameFactory_h__

#include "Singleton.h"
#include "Game.h"

#include <vector>

namespace sv
{
	class GameFactory : public Singleton<GameFactory>
	{
	public:
		GameFactory();
		~GameFactory();
		
		Game*	CreateGame();
		Game*	GetGame(uint id);
		void	EndGame(unsigned int id);

		void	Update();

	private:
		bool m_Lock;
		std::vector<Game*> m_Games;
	};
}

#endif

