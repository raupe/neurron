#include "ServerPCH.h"
#include "Msg.h"

sv::Msg::Msg(uchar type)
: m_Type(type)
{
}

sv::Msg::~Msg()
{
}

void sv::Msg::Visit(unsigned int& i, uchar* buffer, uint& pos, const uint& length)
{
	ASSERT(pos + 4 < length, "Msg too long");
	buffer[pos++] = i >> 24;
	buffer[pos++] = (i >> 16) & 0xFF;
	buffer[pos++] = (i >> 8) & 0xFF;
	buffer[pos++] = i & 0xFF;
}

void sv::Msg::Visit(uchar& i, uchar* buffer, uint& pos, const uint& length)
{
	ASSERT(pos < length, "Msg too long");
	buffer[pos++] = i;
}

sv::ResponseMsg::ResponseMsg(uchar id, uchar color)
: Msg(eMsgType_Response)
, m_Id(id)
, m_Color(color)
{
}

void sv::ResponseMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Id, buffer, pos, length);
	Visit(m_Color, buffer, pos, length);
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

sv::MoveMsg::MoveMsg(uchar dir)
: Msg(eMsgType_Move)
, m_Direction(dir)
{
}

void sv::MoveMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);

	Visit(m_Direction, buffer, pos, length);
}

sv::PollingMsg::PollingMsg()
: Msg(eMsgType_Polling)
{
}

void sv::PollingMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
}

//////////////////////////////////////////////////////////////////////////////////////////////

sv::ResponseOkMsg::ResponseOkMsg()
: Msg(eMsgType_ResponseOk)
{
}

void sv::ResponseOkMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
}

sv::ResponseStartMsg::ResponseStartMsg(uchar id, uchar color)
: Msg(eMsgType_ResponseStart)
, m_Id(id)
, m_Color(color)
{
}

void sv::ResponseStartMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_Id, buffer, pos, length);
	Visit(m_Color, buffer, pos, length);
}

sv::ResponseNoGameMsg::ResponseNoGameMsg()
: Msg(eMsgType_ResponseNoGame)
{
}

void sv::ResponseNoGameMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
}