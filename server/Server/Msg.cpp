#include "ServerPCH.h"
#include "Msg.h"

sv::Msg::Msg()
{
}


sv::Msg::~Msg()
{
}

void sv::Msg::SendMsg(SOCKET connection)
{
	Visit();
}

std::string sv::Msg::GetMsg(SOCKET connection)
{
	return "";
}

void sv::Msg::Visit(uint i)
{

}