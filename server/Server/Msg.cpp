#include "ServerPCH.h"
#include "Msg.h"

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