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

		void			SendMsg(int connection);
		std::string		GetMsg(int connection);

	protected:
		virtual void	Visit() = 0;

		void			Visit(unsigned int i);

	private:
		unsigned int	m_Type;
		int				m_Socket;
	};

	class ControllerMsg : public Msg
	{
	public:
		enum EAction
		{
			eAction_Start = 1,
			eAction_End,
			eAction_Right,
			eAction_Left,
			eAction_Front,
			eAction_Back,
		};

	private:
		unsigned int	m_Channel;
		unsigned int	m_ControllerId;
		unsigned int	m_Action;
	};
}

#endif

