#ifndef Game_h__
#define Game_h__

#include "InputMsgPool.h"

#ifndef WIN32
#include <time.h>
#endif

namespace sv
{
	class Msg;
	class PlayerManager;
	class ObstacleManager;
	class Grid;

	class Game
	{
		template<class T>
		friend class Pool;
	private:
		enum EGameStatus
		{
			eGameStatus_Wait,
			eGameStatus_Countdown,
			eGameStatus_Run,
		};

	public:
		void				Init(uint id, int socket);

		void				Update();
		void				StartGame();
		
		uchar				GetId() { return m_Id; }
		int					GetSocket() { return m_Socket; }

		void				HandleMsg(InputMsg* msg);
		void				HandleStartMsg(InputMsg* msg);
		void				HandleMoveMsg(InputMsg* msg, bool rigth);
		void				SendMsg(Msg* msg);
		
	private:
		Game();
		~Game();			

		void				InitTime();
		ulong				GetDeltaTime();

		// general
		uchar				m_Id;
		uchar				m_Status;
		PlayerManager*		m_PlayerManager;
		ObstacleManager*	m_ObstacleManager;
		Grid*				m_Grid;

		// countdown
		ulong				m_Countdown;

		// connection
		int					m_Socket;
		ulong				m_TimeLastMsg;

		//time
		long long			m_Time;
#ifdef WIN32
		double				m_Frequence;
#endif
	};
}

#endif

