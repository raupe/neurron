#include "ServerPCH.h"
#include "Server.h"

#include "Output.h"

void End()
{
	sv::Server::Destroy();
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

int main()
{
#ifdef WIN32
	SetConsoleCtrlHandler(ConsoleClosing, true);
#endif

	sv::Server* server = sv::Server::Create();
	server->Run();

	End();
	return 0;
}