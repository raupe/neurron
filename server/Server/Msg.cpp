#include "ServerPCH.h"
#include "Msg.h"

#include <stdlib.h>

sv::Msg::Msg(uchar type)
: m_Type(type)
{
}

sv::Msg::~Msg()
{
}

void sv::Msg::Visit(uchar i, uchar* buffer, uint& pos, const uint& length)
{
	ASSERT(pos < length, "Msg too long");
	buffer[pos++] = i;
}

sv::PollingMsg::PollingMsg()
: Msg(eMsgType_Polling)
{
}

void sv::PollingMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
}

sv::InitMsg::InitMsg(uchar channel)
: Msg(eMsgType_Init)
, m_Channel(channel)
{
}

void sv::InitMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);

	Visit(m_Channel, buffer, pos, length);
}

sv::CountdownMsg::CountdownMsg(uchar length)
: Msg(eMsgType_Countdown)
, m_Length(length)
{
}

void sv::CountdownMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_Length, buffer, pos, length);
}

sv::StartMsg::StartMsg(uchar pos)
: Msg(eMsgType_Start)
, m_Number(pos)
{
	m_Colors = (uchar*) malloc(m_Number * sizeof(m_Number));
	m_Pos = (uchar*) malloc(m_Number * sizeof(m_Number));
}

sv::StartMsg::~StartMsg()
{
	free(m_Colors);
	free(m_Pos);
}

void sv::StartMsg::SetColors(uchar* colors)
{
	for(uint i=0; i< m_Number; ++i)
		m_Colors[i] = colors[i];
}

void sv::StartMsg::SetPos(uchar* pos)
{
	for(uint i=0; i< m_Number; ++i)
		m_Pos[i] = pos[i];
}

void sv::StartMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);

	Visit(m_Number, buffer, pos, length);
	for(uint i=0; i< m_Number; ++i)
	{
		Visit(m_Pos[i], buffer, pos, length);
		Visit(m_Colors[i], buffer, pos, length);
	}
}

sv::MoveMsg::MoveMsg(uchar playerId, uchar pos)
: Msg(eMsgType_Move)
, m_PLayerId(playerId)
, m_Pos(pos)
{
}

void sv::MoveMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_PLayerId, buffer, pos, length);
	Visit(m_Pos, buffer, pos, length);
}

//////////////////////////////////////////////////////////////////////////////////////////////

sv::ResponseStartMsg::ResponseStartMsg(uchar id, uchar color)
: Msg(eMsgType_ResponseStart)
, m_Id(id)
, m_Color(color)
{
}

void sv::ResponseStartMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type - eMsgType_Response, buffer, pos, length);
	
	Visit(m_Id, buffer, pos, length);
	Visit(m_Color, buffer, pos, length);
}

sv::ResponseStatusMsg::ResponseStatusMsg(uchar status)
: Msg(eMsgType_ResponseStatus)
, m_Status(status)
{
}

void sv::ResponseStatusMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type - eMsgType_Response, buffer, pos, length);

	Visit(m_Status, buffer, pos, length);
}