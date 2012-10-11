#ifndef GameFactory_h__
#define GameFactory_h__

#include "Singleton.h"
#include "Game.h"

#include <WinSock2.h>
#include <vector>

namespace sv
{
	class GameFactory : public Singleton<GameFactory>
	{
	public:
		GameFactory();
		~GameFactory();

		Game*	CreateGame();
		void	EndGame(unsigned int id);

	private:
		bool m_Lock;
		std::vector<Game*> m_Games;
	};
}

#endif

