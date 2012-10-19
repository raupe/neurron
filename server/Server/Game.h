#ifndef Game_h__
#define Game_h__

#include "Msg.h"
#include <queue>

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

		void				AddMsg(Msg* msg);

	private:
		Game(unsigned int id);
		~Game();

		void				HandleMsgs();

		int					m_Socket;
		unsigned int		m_Id;
		std::queue<Msg*>	m_Msgs;
	};
}

#endif

