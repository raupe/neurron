#ifndef GameManager_h__
#define GameManager_h__

#include "Singleton.h"
#include "Game.h"

#include "Pool.h"
#include <vector>

namespace sv
{
	class GameManager : public Pool<Game>
	{
	public:
		GameManager();
		~GameManager();
		
		Game*	CreateGame(int socket);
		Game*	GetGame(uchar id);
		void	DeleteGame(Game* game);

		void	Update();

	private:
		bool	m_Lock;
		std::vector<Game*> m_Games;
		uchar	m_CountId;
	};
}

#endif

