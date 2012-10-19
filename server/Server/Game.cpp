#include "ServerPCH.h"
#include "Game.h"

sv::Game::Game(unsigned int id)
: m_Id(id)
{
}

sv::Game::~Game()
{
}

void sv::Game::Update()
{
	HandleMsgs();



}

void sv::Game::AddMsg(Msg* msg)
{
	m_Msgs.push(msg);
}

void sv::Game::HandleMsgs()
{
/*	uint msgSize = m_Msgs.size();
	for(uint i=0; i<msgSize; ++i)
	{
		Msg* msg = m_Msgs.front();
		m_Msgs.pop();
	}*/
}