#ifndef Game_h__
#define Game_h__

#include "InputMsgPool.h"

namespace sv
{
	class Game
	{
		friend class GameFactory;
	public:
		unsigned int		GetId() { return m_Id; }

		void				Update();

		void				SetSocket(int s) { m_Socket = s; }
		int					GetSocket() { return m_Socket; }

		void				HandleMsg(InputMsg* msg);

	private:
		Game(unsigned int id);
		~Game();

		int					m_Socket;
		unsigned int		m_Id;
	};
}

#endif

