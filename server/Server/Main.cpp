#include "ServerPCH.h"

#include "Server.h"

int main()
{
	sv::Server* server = new sv::Server();
	server->Run();

	delete(server);
	return 0;
}