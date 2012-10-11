#pragma comment(lib, "Ws2_32.lib")

#include "ServerPCH.h"
#include "Server.h"

#include <Windows.h>

#include "Output.h"

sv::Server::Server()
{
}

sv::Server::~Server()
{
}

void sv::Server::Run()
{
	long answer;
	WSAData winData;
	WORD dllVersion = MAKEWORD(2,1);
	answer = WSAStartup(dllVersion, &winData);

	SOCKADDR_IN addr;
	int addrLen = sizeof(addr);
	SOCKET sListen;
	SOCKET sConnect;

	sConnect = socket(AF_INET, SOCK_STREAM, NULL);
	addr.sin_addr.s_addr = INADDR_ANY;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(2020);

	sListen = socket(AF_INET, SOCK_STREAM, NULL);
	bind(sListen, (SOCKADDR*)&addr, sizeof(addr));
	listen(sListen, SOMAXCONN);

	while(true)
	{
		Output::Print("Waiting for incoming connection");
		if(sConnect = accept(sListen, (SOCKADDR*)&addr, &addrLen))
		{
			HandleConnection(sConnect);
		}
	}
}

void sv::Server::HandleConnection(SOCKET connection)
{
	Output::Print("Connection found");
	Output::Print("");

	char message[1024];
	memset(message, 0, sizeof(message));

	recv(connection, message, sizeof(message), NULL);
	Output::Print(message);



	//std::string response = "HTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\n\nHallo\n";

	std::string response = "HTTP/1.1 200 OK\nAccess-Control-Allow-Origin: *\n\n";
/*Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml*/

	send(connection, response.c_str(), response.length() + 1, NULL);

	closesocket(connection);
}