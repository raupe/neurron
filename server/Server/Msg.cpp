#include "ServerPCH.h"
#include "Msg.h"

//#define BIT_CHANNEL 10
//#define BIT_CONTROLLER 5
//#define BIT_ACTION 17

#define CHANNEL_SHIFT 22
#define CONTROLLER_SHIFT 17
#define ACTION_SHIFT 0

#define CHANNEL_MASK 0x3FF
#define CONTROLLER_MASK 0x1F
#define ACTION_MASK 0x1FFFF

sv::Msg::Msg(uint type)
: m_Type(type)
{
}

sv::Msg::~Msg()
{
}

void sv::Msg::Visit(uchar* buffer, bool read, uint& pos, const uint& length)
{
	m_Read = read;
	VisitInt(buffer, pos, length);
}

void sv::Msg::Visit(unsigned int& i, uchar* buffer, uint& pos, const uint& length)
{
	ASSERT(pos + 4 < length, "Msg too long");
	if(m_Read)
	{
		i = 0;
		i |= buffer[pos++] << 24;
		i |= buffer[pos++] << 16;
		i |= buffer[pos++] << 8;
		i |= buffer[pos++];
	}
	else
	{
		buffer[pos++] = i >> 24;
		buffer[pos++] = (i >> 16) & 0xFF;
		buffer[pos++] = (i >> 8) & 0xFF;
		buffer[pos++] = i & 0xFF;
	}
}

void sv::Msg::Visit(uchar& i, uchar* buffer, uint& pos, const uint& length)
{
	ASSERT(pos < length, "Msg to long");
	if(m_Read)
	{
		i = buffer[pos++];
	}
	else
	{
		buffer[pos++] = i;
	}
}

sv::ControllerMsg::ControllerMsg()
: Msg(eMsgType_ControllerMsg)
, m_Channel(0)
, m_ControllerId(0)
, m_Action(0)
{
}

sv::ControllerMsg::~ControllerMsg()
{
}

void sv::ControllerMsg::VisitInt(uchar* buffer, uint& pos, const uint& length)
{
	if(length != 4)
		return;
	uint i = 0;
	Visit(i, buffer, pos, length);
	
	m_Channel = (i >> CHANNEL_SHIFT) & CHANNEL_MASK;
	m_ControllerId = (i >> CONTROLLER_SHIFT) & CONTROLLER_MASK;
	m_Action = (i >> ACTION_SHIFT) & ACTION_MASK;
}