#ifndef Server_h__
#define Server_h__

#include "Singleton.h"
#include "HttpProtocol.h"

namespace sv
{
	class Msg;

	class Server : public Singleton<Server>
	{
	public:
		Server();
		~Server();

		void Init();
		void Exit();
		void Run();
		
		void SendSocketMsg(Msg* msg, uint socket);
		void SendSocketMsg(const char* msg, uint length, uint socket);
		void Response(uchar* msg, uint length, uint socket);
	private:
		void HandleConnection(int socket);
		HttpProtocol http;
	};
}

#endif
