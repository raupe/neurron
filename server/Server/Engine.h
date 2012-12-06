#ifndef Engine_h__
#define Engine_h__

#include "Singleton.h"
#include <boost/thread.hpp>

namespace sv
{
	class GameManager;

	class Engine : public Singleton<Engine>
	{
	public:
		Engine(void);
		~Engine(void);

		void Run();

		void						Continue();
	private:
		void						HandleMsgs();
		
		GameManager*				m_GameManager;

		bool						m_Paused;
		boost::mutex				m_MutexPaused;
		boost::condition_variable	m_ConditionPaused;
	};
}

#endif

