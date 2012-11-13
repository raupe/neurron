#include "ServerPCH.h"
#include "InputMsg.h"

sv::InputMsg::InputMsg()
{
}
	
void sv::InputMsg::SetContent(uchar* buffer, const uint& length, uint socket)
{
	m_Socket = socket;
	if(length != 3)
	{
		m_Channel = 0;
		m_ControllerId = 0;
		m_Action = 0;
	}
	else
	{
		m_Channel = buffer[0];
		m_ControllerId = buffer[1];
		m_Action = buffer[2];
	}

	if(m_Action >= eContrAction_Max)
		m_Action = eContrAction_Undifined;
}

void sv::InputMsg::SetContent(uint channel, uint controllerId, uint action, uint socket)
{
	m_Socket = socket;
	m_Channel = channel;
	m_ControllerId = controllerId;
	m_Action = action;
}

sv::InputMsg::~InputMsg()
{
}
