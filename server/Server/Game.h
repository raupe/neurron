#ifndef Game_h__
#define Game_h__

#include "InputMsgPool.h"

#ifndef WIN32
#include <time.h>
#endif

namespace sv
{
	class Msg;

	class Game
	{
		template<class T>
		friend class Pool;
	private:
		enum EGameStatus
		{
			eGameStatus_Waiting,
			eGameStatus_Countdown,
			eGameStatus_Running
		};

	public:
		uchar				GetId() { return m_Id; }
		void				SetId(uint id) { m_Id = id; }

		void				Update();

		void				SetSocket(int s) { m_Socket = s; }
		int					GetSocket() { return m_Socket; }

		void				HandleMsg(InputMsg* msg);
		void				SendMsg(Msg* msg);
		
	private:
		Game();
		~Game();			

		void				InitTime();
		ulong				GetDeltaTime();

		int					m_Socket;
		uchar				m_Id;
		uint				m_Status;

		ulong				m_TimeLastMsg;

		long long			m_Time;
#ifdef WIN32
		double				m_Frequence;
#endif
	};
}

#endif

