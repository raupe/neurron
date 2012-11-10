#ifndef Game_h__
#define Game_h__

#include "InputMsgPool.h"

#ifndef WIN32
#include <time.h>
#endif

namespace sv
{
	class Game
	{
		template<class T>
		friend class Pool;
	public:
		unsigned int		GetId() { return m_Id; }
		void				SetId(uint id) { m_Id = id; }

		void				Update();

		void				SetSocket(int s) { m_Socket = s; }
		int					GetSocket() { return m_Socket; }

		void				HandleMsg(InputMsg* msg);
		
	private:
		Game();
		~Game();

		void				InitTime();
		int					GetDeltaTime();

		int					m_Socket;
		unsigned int		m_Id;

#ifdef WIN32
		long long			m_Time;
		double				m_Frequence;
#else
		timespec			m_Time;
#endif
	};
}

#endif

