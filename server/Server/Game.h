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
	class StatusManager;
	class Grid;

	class Game
	{
		friend class GameManager;
	private:
		enum EGameStatus
		{
			eGameStatus_Wait,
			eGameStatus_Countdown,
			eGameStatus_Run,
		};

	public:
		void				Init(uint id, int socket);
		void				Reset();
		void				Start();
		void				Update();
		void				End();
		
		uchar				GetId() { return m_Id; }
		int					GetSocket() { return m_Socket; }

		void				HandleMsg(InputMsg* msg);
		void				HandleStartMsg(InputMsg* msg);
		void				HandleMoveMsg(InputMsg* msg, uchar dir);
		void				HandleHealMsg(InputMsg* msg);

		void				SendMsg(Msg* msg);
		
		PlayerManager*		GetPlayerManager() { return m_PlayerManager; }
		ObstacleManager*	GetObstacleManager() { return m_ObstacleManager; }
		StatusManager*		GetStatusManager() { return m_StatusManager; }
		Grid*				GetGrid() { return m_Grid; }

		bool				IsRunning() { return m_Status != eGameStatus_Wait; }
		
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
		StatusManager*		m_StatusManager;
		Grid*				m_Grid;

		// countdown
		ulong				m_Countdown;

		// run
		ulong				m_RunTime;

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

