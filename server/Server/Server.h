#ifndef Server_h__
#define Server_h__

#include <winsock2.h>

namespace sv
{
	class Server
	{
	public:
		Server();
		~Server();

		void Run();
	private:
		void HandleConnection(SOCKET );
	};
}

#endif
