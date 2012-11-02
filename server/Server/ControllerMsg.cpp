#include "ServerPCH.h"
#include "ControllerMsg.h"

sv::ControllerMsg::ControllerMsg()
: m_ControllerId(0)
, m_Action(0)
{
}

sv::ControllerMsg::~ControllerMsg()
{
}

void sv::ControllerMsg::GetContent(uchar* buffer, const uint& length, uint& channel, uint& controllerId, uint& action)
{	
	channel = 0;
	controllerId = 0;
	action = 0;
	
	if(length != 3)
		return;

	channel = buffer[0];
	controllerId = buffer[1];
	action = buffer[2];
}
