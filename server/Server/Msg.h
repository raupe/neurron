#ifndef Msg_h__
#define Msg_h__

#include <string>

namespace sv
{
	enum EMsgType
	{
		eMsgType_ControllerMsg,
	};

	class Msg
	{
	public:
		Msg(uint type);
		virtual ~Msg();

		void Visit(uchar* buffer, bool read, uint& pos, const uint& length);
		virtual void VisitInt(uchar* buffer, uint& pos, const uint& length) = 0;

	protected:
		void			Visit(unsigned int& i, uchar* buffer, uint& pos, const uint& length);
		void			Visit(uchar& i, uchar* buffer, uint& pos, const uint& length);

	private:
		unsigned int	m_Type;
		bool			m_Read;
	};
}

#endif

