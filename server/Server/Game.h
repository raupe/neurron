#ifndef Game_h__
#define Game_h__

#include "ControllerMsgPool.h"

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

		ControllerMsgPool*	GetMsgPool() { return m_Msgs; }

	private:
		Game(unsigned int id);
		~Game();

		void				HandleMsgs();
		void				HandleMsg(ControllerMsg* msg);

		int					m_Socket;
		unsigned int		m_Id;
		ControllerMsgPool*	m_Msgs;
	};
}

#endif

