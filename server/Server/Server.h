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
		
		bool SendSocketMsg(Msg* msg, uint socket);
		void Response(Msg* msg, uint socket);

		void CloseSocket(uint socket);
	private:
		void HandleConnection(int socket);
		HttpProtocol http;
	};
}

#endif
