#ifndef Msg_h__
#define Msg_h__

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

		void SendMsg(int connection);
		std::string GetMsg(int connection);

	protected:
		virtual void Visit() = 0;

		void Visit(uint i);

	private:
		uint m_Type;
	};
}

#endif

