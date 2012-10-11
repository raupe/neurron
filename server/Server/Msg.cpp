#include "ServerPCH.h"
#include "Msg.h"

sv::Msg::Msg()
{
}


sv::Msg::~Msg()
{
}

void sv::Msg::SendMsg(int connection)
{
	Visit();
}

std::string sv::Msg::GetMsg(int connection)
{
	return "";
}

void sv::Msg::Visit(uint i)
{

}