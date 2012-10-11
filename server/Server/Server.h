#ifndef Server_h__
#define Server_h__

#ifdef WIN32
#include <winsock.h>
#else
#include <netdb .h>
#include <arpa /inet.h>
#include <netinet /in.h>
#include <sys /socket.h>
#include <sys /types.h>
#endif

namespace sv
{
	class Server
	{
	public:
		Server();
		~Server();

		void Run();
	private:
		void HandleConnection(int socket);
	};
}

#endif
