#ifndef GameManager_h__
#define GameManager_h__

#include "Singleton.h"

#include "Pool.h"
#include <vector>

namespace sv
{
	class Game;

	class GameManager
	{
	public:
		GameManager();
		~GameManager();
		
		Game*	CreateGame(int socket);
		Game*	GetGame(uchar id);
		void	DeleteGame(Game* game);

		Game*	GetGameByIndex(uchar index);
		uchar	GetSize() { return m_UsedSize; }

		void	Update();

	private:
		uchar	m_CountId;

		Game**	m_Games;
		uchar	m_AllocSize;
		uchar	m_UsedSize;
	};
}

#endif

