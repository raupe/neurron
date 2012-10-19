#include "ServerPCH.h"
#include "Engine.h"

#include "GameFactory.h"

sv::Engine::Engine(void)
{
}


sv::Engine::~Engine(void)
{
}

void sv::Engine::Run()
{
	while(true)
	{
		GameFactory::Instance()->Update();
	}
}
