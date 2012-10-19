#include "ServerPCH.h"

#include "Server.h"
#include "Engine.h"

#include "Output.h"
#include <boost/thread.hpp>

void End()
{
	sv::Server::Destroy();
	sv::Engine::Destroy();
#ifdef DEBUG
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
	// HINSTANCE hInst = LoadLibrary("D:
#ifdef WIN32
	SetConsoleCtrlHandler(ConsoleClosing, true);
#endif

	sv::Server::Create();
	sv::Engine::Create();

	boost::thread serverThread(RunServer);
	boost::thread engineThread(RunEngine);

	serverThread.join();
	engineThread.join();

	End();
	return 0;
}