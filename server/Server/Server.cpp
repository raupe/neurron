#pragma comment(lib, "Ws2_32.lib")

#include "ServerPCH.h"
#include "Server.h"

#include "Msg.h"
#include "InputMsg.h"
#include "InputMsgPool.h"

#ifdef WIN32
#include <winsock.h>

#define SEND(socket, message, length) send(socket, message, length, NULL)
#define CLOSE_SOCKET(s) closesocket(s);
#define GET_ERROR WSAGetLastError()

#else
#include <netdb.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <string.h>

#define SEND(socket, message, length) send(socket, message, length, MSG_NOSIGNAL)
#define CLOSE_SOCKET(s) close(s);
#define GET_ERROR errno
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
}

void sv::Server::Exit()
{
}

void sv::Server::Run()
{

	/*
	sv::RequestInfo info = http.GetInfo("GET /chat HTTP/1.1\nHost: server.example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: O7EkXwrJX+50kcYu88XlEQ==\nOrigin: http://example.com\nSec-WebSocket-Protocol: chat, superchat\nSec-WebSocket-Version: 13\n\n");
	std::string header = http.GetSocketHeader(info);
	Output::Print(header);
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
	ASSERT(sListen != -1, "Couldn't create a socket.");

#ifdef WIN32
	bind(sListen, (SOCKADDR*)&addr, sizeof(addr));
#else
	bind(sListen,(sockaddr*)&addr, addrLen);
#endif
	listen(sListen, SOMAXCONN);

	while(true)
	{
		LOG(DEBUG_SERVER,"Waiting for incoming connection");
#ifdef WIN32
		if(sConnect = accept(sListen, (SOCKADDR*)&addr, &addrLen))
#else
		if(sConnect = accept(sListen, (sockaddr*)&addr, (socklen_t*)&addrLen))
#endif
		{
			//u_long iMode=1;
			//ioctlsocket(sConnect, FIONBIO, &iMode);

			HandleConnection(sConnect);
		}
	}

#ifdef WIN32
	WSACleanup();
#endif
}

void sv::Server::HandleConnection(int connection)
{
	LOG(DEBUG_SERVER, "Connection found\n");

	char message[1024];
	memset(message, 0, sizeof(message));

	uint pos = 0;
	int resvLen = recv(connection, message, sizeof(message), NULL);
	std::string msg = message;
	sv::RequestInfo headerInfo = http.GetInfo(msg);

	while(strlen(headerInfo.m_Body.c_str()) != headerInfo.m_BodyLen)
	{
		pos += resvLen;
		resvLen = recv(connection, message + pos, sizeof(message) - pos, NULL);
		std::string msg = message;
		headerInfo = http.GetInfo(msg);
	}

	LOG1(DEBUG_PROTOCOLL,"Incoming Msg:\n%s\n" , message);

	if(http.IsSocketRequest(headerInfo))
	{
		std::string response;
		response = http.GetSocketHeader(headerInfo);
		pos = 0;

		SEND(connection, response.c_str(), response.length());
		/*int sendLen = SEND(connection, response.c_str(), response.length());
		while(sendLen > 0)
		{
			pos += sendLen;
			sendLen = SEND(connection, response.c_str() + pos, response.length() - pos);
		}*/
		
		LOG1(DEBUG_MSG, "Incomming key:\n%s\n", headerInfo.m_SecWebSocketKey.c_str());
		LOG1(DEBUG_MSG, "Socket header:\n%s\n", response.c_str());

		uint index = 0;
		InputMsg* msg = InputMsgPool::Instance()->GetFreeMsg(index);
		msg->SetContent(0, 0, eContrAction_CreateGame, connection);
		InputMsgPool::Instance()->SetUnhandled(index);
	}
	else
	{
		uchar buffer[1024];
		uint length = sizeof(buffer);
		http.DecodeBase64(headerInfo.m_Body, length, buffer);
		LOG1(DEBUG_MSG,"Body:\n%s\n", headerInfo.m_Body.c_str());
		
		uint index;
		InputMsg* msg = InputMsgPool::Instance()->GetFreeMsg(index);
		msg->SetContent(buffer, length, connection);
		InputMsgPool::Instance()->SetUnhandled(index);
	}
}

/*
void sv::Server::SendSocketMsg(const char* msg, uint length, uint socket)
{
	uchar bufferMsg[1024];
	std::memcpy(bufferMsg, msg, length);

	std::string str = http.GetSocketMsg(bufferMsg, length);
	SEND(socket, str.c_str(), length);
}
*/

bool sv::Server::SendSocketMsg(Msg* msg, uint socket)
{
	uchar bufferMsg[1024];
	uint length = 0;
	msg->GetBuffer(bufferMsg, length, sizeof(bufferMsg));

	char buffer[1024];
	http.GetSocketMsg(bufferMsg, buffer, length);
	
	// TODO: test if everything was send
	int success = SEND(socket, buffer, length);
	LOG1(DEBUG_WEBSOCKET && success == -1, "Connection closed: %i", GET_ERROR);
	return success != -1;
}

void sv::Server::Response(Msg* msg, uint socket)
{
	uchar bufferMsg[1024];
	uint length = 0;
	msg->GetBuffer(bufferMsg, length, sizeof(bufferMsg));

	char buffer[1024];
	http.GetMsg(bufferMsg, buffer, length);
	
	// TODO: test if everything was send
	SEND(socket, buffer, length);
	
	
	buffer[length] = 0;
	LOG1(DEBUG_PROTOCOLL,"Outgoing Header:\n%s\n", buffer);
	CLOSE_SOCKET(socket);
}

void sv::Server::CloseSocket(uint socket)
{
	CLOSE_SOCKET(socket);
}