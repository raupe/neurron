#ifndef MsgPool_h__
#define MsgPool_h__

#include <boost/thread.hpp>

namespace sv
{
	class ControllerMsg;

	enum EMsgStatus
	{
		eMsgStatus_Free,
		eMsgStatus_FreeInUse,
		eMsgStatus_Unhandled,
		eMsgStatus_UnhandledInUse,
		eMsgStatus_Handled,
		eMsgStatus_HandledInUse
	};

	struct Entry
	{
		Entry();
		~Entry();
		ControllerMsg* msg;
		uint status;
	};

	class ControllerMsgPool
	{
	public:
		ControllerMsgPool();
		~ControllerMsgPool();

		sv::ControllerMsg*	GetFreeMsg(uint& index);
		void				GetUnhandledMsgs(std::vector<ControllerMsg*>& msgs, std::vector<uint>& indecies);
		void				GetHandledMsgs(std::vector<ControllerMsg*>& msgs, std::vector<uint>& indiecies);

		void				SetUnhandled(uint index);
		void				SetHandled(std::vector<uint>& indecies);
		void				Free(std::vector<uint>& indecies);

	private:
		std::vector<Entry>	m_Msgs;
		boost::mutex 		m_Mutex;
	};
}

#endif