#pragma comment(lib, "Ws2_32.lib")

#include "ServerPCH.h"
#include "Server.h"

#include "Output.h"

#include <string.h>

sv::Server::Server()
{
}

sv::Server::~Server()
{
}

void sv::Server::Run()
{
#ifdef WIN32
	long answer;
	WSAData winData;
	WORD dllVersion = MAKEWORD(2,1);
	answer = WSAStartup(dllVersion, &winData);

	SOCKADDR_IN addr;
#else
	sockaddr_in addr;
#endif

	int addrLen = sizeof(addr);
	int sListen;
	int sConnect;

/*	sConnect = socket(AF_INET, SOCK_STREAM, NULL);
	if(sConnect == -1)
		Output::Error("Couldn't create a socket."); */

	addr.sin_addr.s_addr = INADDR_ANY;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(2020);

	sListen = socket(AF_INET, SOCK_STREAM, NULL);
	if(sListen == -1)
		Output::Error("Couldn't create a socket.");

#ifdef WIN32
	bind(sListen, (SOCKADDR*)&addr, sizeof(addr));
#else
	bind(sListen,(sockaddr*)&addr, addrLen);
#endif
	listen(sListen, SOMAXCONN);

	while(true)
	{
		Output::Print("Waiting for incoming connection");
#ifdef WIN32
		if(sConnect = accept(sListen, (SOCKADDR*)&addr, &addrLen))
#else
		if(sConnect = accept(sListen, (sockaddr*)&addr, (socklen_t*)&addrLen))
#endif
		{
			HandleConnection(sConnect);
		}
	}

#ifdef WIN32
	WSACleanup();
#endif
}

void sv::Server::HandleConnection(int connection)
{
	Output::Print("Connection found");
	Output::Print("");

	char message[1024];
	memset(message, 0, sizeof(message));

	recv(connection, message, sizeof(message), NULL);
	Output::Print(message);



	std::string response = "HTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\n\nHallo\n";

	//std::string response = "HTTP/1.1 200 OK\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Methods:\"GET, POST, PUT, DELETE, OPTIONS\"\nAccess-Control-Allow-Header:\"content-type, accept\"\n\nHallo\n";
/*Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml*/

	send(connection, response.c_str(), response.length() + 1, NULL);

#ifdef WIN32
	closesocket(connection);
#else
	close(connection);
#endif
}