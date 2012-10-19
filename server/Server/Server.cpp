#pragma comment(lib, "Ws2_32.lib")

#include "ServerPCH.h"
#include "Server.h"

#include "Output.h"
#include "GameFactory.h"
#include "Game.h"
#include "Msg.h"

#ifdef WIN32
#include <winsock.h>
#define CLOSE_SOCKET(s) closesocket(s);
#else
#include <netdb.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <string.h>
#define CLOSE_SOCKET(s) close(s);
#endif


sv::Server::Server()
{
	Init();
}

sv::Server::~Server()
{
	Exit();
}

void sv::Server::Init()
{
	GameFactory::Create();
}

void sv::Server::Exit()
{
	GameFactory::Destroy();
}

void sv::Server::Run()
{
	/*// test
	unsigned int h[5];
	std::string msg = "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern";
	HttpProtocol::SHA1own((unsigned char *)msg.c_str(), msg.length(), h);

	std::cout << std::hex << h[0] << std::endl;
	//*/



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

	sv::RequestInfo headerInfo = http.GetInfo(msg);

	if(http.IsSocketRequest(headerInfo))
	{
		Game* game = GameFactory::Instance()->CreateGame();
		game->SetSocket(connection);
		std::string response;
		response = http.GetSocketHeader(headerInfo);
		send(connection, response.c_str(), response.length() + 1, NULL);
	}
	else
	{
		ControllerMsg* msg = S_NEW ControllerMsg();
		uchar buffer[1024];
		uint length = sizeof(buffer);
		http.DecodeBase64(headerInfo.m_Body, length, buffer);
		uint pos = 0;
		msg->Visit(buffer, true, pos, length);

		if(msg->GetChannel())
		{
			Game* game = GameFactory::Instance()->GetGame(msg->GetChannel());
			game->AddMsg(msg);
		}
		else
		{
			std::string response;
			response = http.GetErrorHeader();
			send(connection, response.c_str(), response.length() + 1, NULL);
			CLOSE_SOCKET(connection);
		}
	}
}

void sv::Server::SendMsg(Msg* msg, uint socket)
{
	uchar buffer[1024];
	uint pos = 0;
	msg->Visit(buffer,false, pos, sizeof(buffer));
	std::string str = http.GetSocketMsg(buffer, pos);
	
	send(socket, str.c_str(), str.length() + 1, NULL);
}

void sv::Server::Response(Msg* msg, uint socket)
{
	std::string str = http.GetHeader();
	
	uchar buffer[1024];
	uint pos = 0;
	msg->Visit(buffer, false, pos, sizeof(buffer));
	str += http.GetMsg(buffer, pos);
	
	send(socket, str.c_str(), str.length() + 1, NULL);

	CLOSE_SOCKET(socket);
}