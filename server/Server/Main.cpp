#include "ServerPCH.h"

#include "Server.h"
#include "Engine.h"
#include "InputMsgPool.h"
#include "GameManager.h"

#include <boost/thread.hpp>
#ifdef WIN32
#include <Windows.h>
#endif

void End()
{
	sv::Server::Destroy();
	sv::Engine::Destroy();
	sv::InputMsgPool::Destroy();
#ifdef DEBUG_WIN
	DumpUnfreed();
#endif
}

#ifdef WIN32
BOOL WINAPI ConsoleClosing(DWORD dwCtrlType)
{
	if (dwCtrlType == CTRL_CLOSE_EVENT)
    {
		End();
    }
	return false;
}
#endif

void RunServer()
{
	sv::Server::Instance()->Run();
}

void RunEngine()
{
	sv::Engine::Instance()->Run();
}

int main()
{
#ifdef WIN32
	SetConsoleCtrlHandler(ConsoleClosing, true);
#endif

	sv::Server::Create();
	sv::Engine::Create();
	sv::InputMsgPool::Create();

	boost::thread serverThread(RunServer);
	boost::thread engineThread(RunEngine);

	serverThread.join();
	engineThread.join();

	End();
	return 0;
}