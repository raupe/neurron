#include "ServerPCH.h"
#include "InputMsg.h"

#include <stdlib.h>
#include <string.h>

sv::InputMsg::InputMsg()
: m_Data(0)
{
}

sv::InputMsg::~InputMsg()
{
	free(m_Data);
}
	
void sv::InputMsg::SetContent(uchar* buffer, const uint& length, uint socket)
{
	m_Socket = socket;
	if(length < 3)
	{
		m_Channel = 0;
		m_ControllerId = 0;
		m_Action = 0;
		m_Data = 0;
	}
	else
	{
		m_Channel = buffer[0];
		m_ControllerId = buffer[1];
		m_Action = buffer[2];

		if(length > 3)
		{
			m_Data = (uchar*) malloc((length - 2) * sizeof(char));
			memcpy(m_Data, buffer + 3, length - 3);
			m_Data[length - 3] = 0;
		}
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
	m_Data = 0;
}
