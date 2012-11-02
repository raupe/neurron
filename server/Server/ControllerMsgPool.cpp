#include "ServerPCH.h"
#include "ControllerMsgPool.h"

#include "ControllerMsg.h"

sv::ControllerMsgPool::ControllerMsgPool()
{
}


sv::ControllerMsgPool::~ControllerMsgPool()
{
	for(uint i=0; i<m_Msgs.size(); ++i)
	{
		delete(m_Msgs[i].msg);
	}
}


sv::ControllerMsg* sv::ControllerMsgPool::GetFreeMsg(uint& index)
{
	boost::mutex::scoped_lock l(m_Mutex);
	for(uint i=0; i<m_Msgs.size(); ++i)
	{
		if(m_Msgs[i].status == eMsgStatus_Free)
		{
			m_Msgs[i].status = eMsgStatus_FreeInUse;
			index = i;
			return m_Msgs[i].msg;
		}
	}
	
	index = m_Msgs.size();
	m_Msgs.resize(index == 0? 1 : index*2);
	for(uint i=index; i<m_Msgs.size(); ++i)
	{
		m_Msgs[i].msg = S_NEW ControllerMsg();
	}

	m_Msgs[index].status = eMsgStatus_FreeInUse;
	return m_Msgs[index].msg;
}

void sv::ControllerMsgPool::GetUnhandledMsgs(std::vector<ControllerMsg*>& msgs, std::vector<uint>& indecies)
{
	boost::mutex::scoped_lock l(m_Mutex);
	for(uint i=0; i<m_Msgs.size(); ++i)
	{
		if(m_Msgs[i].status == eMsgStatus_Unhandled)
		{
			m_Msgs[i].status = eMsgStatus_UnhandledInUse;
			indecies.push_back(i);
			msgs.push_back(m_Msgs[i].msg);
		}
	}
}

void sv::ControllerMsgPool::GetHandledMsgs(std::vector<ControllerMsg*>& msgs, std::vector<uint>& indecies)
{
	boost::mutex::scoped_lock l(m_Mutex);
	for(uint i=0; i<m_Msgs.size(); ++i)
	{
		if(m_Msgs[i].status == eMsgStatus_Handled)
		{
			m_Msgs[i].status = eMsgStatus_HandledInUse;
			indecies.push_back(i);
			msgs.push_back(m_Msgs[i].msg);
		}
	}
}

void sv::ControllerMsgPool::SetUnhandled(uint index)
{
	boost::mutex::scoped_lock l(m_Mutex);
	ASSERT(m_Msgs[index].status == eMsgStatus_FreeInUse, "sv::ControllerMsgPool::SetUnhandled : invalid index");
	m_Msgs[index].status = eMsgStatus_Unhandled;
}

void sv::ControllerMsgPool::SetHandled(std::vector<uint>& indecies)
{
	boost::mutex::scoped_lock l(m_Mutex);
	for(uint i=0; i<indecies.size(); ++i)
	{
		ASSERT(m_Msgs[indecies[i]].status == eMsgStatus_UnhandledInUse, "sv::ControllerMsgPool::SetUnhandled : invalid index");
		m_Msgs[indecies[i]].status = eMsgStatus_Handled;
	}
}

void sv::ControllerMsgPool::Free(std::vector<uint>& indecies)
{
	boost::mutex::scoped_lock l(m_Mutex);
	for(uint i=0; i<indecies.size(); ++i)
	{
		//ASSERT(m_Msgs[indecies[i]].status == eMsgStatus_HandledInUse, "sv::ControllerMsgPool::SetUnhandled : invalid index");
		ASSERT(m_Msgs[indecies[i]].status == eMsgStatus_UnhandledInUse, "sv::ControllerMsgPool::SetUnhandled : invalid index");
		m_Msgs[indecies[i]].status = eMsgStatus_Free;
	}
}

sv::Entry::Entry()
: status(eMsgStatus_Free)
{
	//msg = S_NEW ControllerMsg();
}

sv::Entry::~Entry()
{
	//delete (msg);
}