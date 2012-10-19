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

	class ControllerMsg : public Msg
	{
	public:
		ControllerMsg();
		~ControllerMsg();

		enum EAction
		{
			eAction_Undifined,
			eAction_Start,
			eAction_End,
			eAction_Right,
			eAction_Left,
			eAction_Front,
			eAction_Back,
		};

		virtual void VisitInt(uchar* buffer, uint& pos, const uint& length);

		uint			GetChannel() { return m_Channel; }
		uint			GetControllerId() { return m_ControllerId; }
		uint			GetAction() { return m_Action; }

	private:
		unsigned int	m_Channel;
		unsigned int	m_ControllerId;
		unsigned int	m_Action;
	};
}

#endif

