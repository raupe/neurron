#pragma comment(lib, "Ws2_32.lib")

#include "ServerPCH.h"
#include "Server.h"

#include "Output.h"
#include "HttpProtocol.h"

#ifndef WIN32
#include <string.h>
#endif

sv::Server::Server()
{
}

sv::Server::~Server()
{
}

void sv::Server::Run()
{
	// test
	unsigned int h[5];
	std::string msg = "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern";
	HttpProtocol::SHA1own((unsigned char *)msg.c_str(), msg.length(), h);

	//



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
	std::string msg = message;
	Output::Print(msg);

	sv::RequestInfo headerInfo = HttpProtocol::GetInfo(msg);

	std::string response;
	if(HttpProtocol::IsSocketRequest(headerInfo))
	{
		response = HttpProtocol::GetSocketResponse(headerInfo);
	}
	else
	{
		response = HttpProtocol::GetHeader();
	}

	send(connection, response.c_str(), response.length() + 1, NULL);

#ifdef WIN32
	closesocket(connection);
#else
	close(connection);
#endif
}