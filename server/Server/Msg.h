#ifndef Msg_h__
#define Msg_h__

#include <WinSock2.h>
#include <string>

namespace sv
{
	enum EMsgType
	{

	};

	class Msg
	{
	public:
		Msg();
		~Msg();

		void SendMsg(SOCKET connection);
		std::string GetMsg(SOCKET connection);

	protected:
		virtual void Visit() = 0;

		void Visit(uint i);

	private:
		uint m_Type;
	};
}

#endif

