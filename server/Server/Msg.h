#ifndef Msg_h__
#define Msg_h__

#include <string>

namespace sv
{
	enum EMsgType
	{
		eMsgType_Init,
		eMsgType_Move,

		// Controller Msgs
		eMsgType_Response,
	};

	class Msg
	{
	public:
		Msg(uchar type);
		virtual	~Msg();

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length) = 0;

	protected:
		void			Visit(unsigned int& i, uchar* buffer, uint& pos, const uint& length);
		void			Visit(uchar& i, uchar* buffer, uint& pos, const uint& length);

		uchar			m_Type;
	};

	class ResponseMsg : public Msg
	{
	public:
		ResponseMsg(uchar id, uchar color);
		virtual ~ResponseMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

	private:
		uchar			m_Id;
		uchar			m_Color;
	};

	class InitMsg : public Msg
	{
	public:
		InitMsg(uchar channel);
		virtual ~InitMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

	private:
		uchar			m_Channel;
	};

	class MoveMsg : public Msg
	{
	public:
		MoveMsg(uchar dir);
		virtual ~MoveMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

	private:
		uchar			m_Direction;
	};
}

#endif

