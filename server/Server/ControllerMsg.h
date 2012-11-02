#ifndef ControllerMsg_h__
#define ControllerMSg_h__

namespace sv
{
	
	enum EContrAction
	{
		eContrAction_Undifined,
		eContrAction_Start,
		eContrAction_End,
		eContrAction_Right,
		eContrAction_Left,
		eContrAction_Front,
		eContrAction_Back,
	};

	class ControllerMsg
	{
	public:
		ControllerMsg();
		~ControllerMsg();

		static void		GetContent(uchar* buffer, const uint& length, uint& channel, uint& controllerId, uint& action);

		uint			GetControllerId() { return m_ControllerId; }
		void			SetControllerId(uint controllerId) { m_ControllerId = controllerId; }

		uint			GetAction() { return m_Action; }
		void			setAction(uint action) { m_Action = action; }

		uint			GetSocket() { return m_Socket; }
		void			SetSocket(uint socket) { m_Socket = socket; }

	private:
		unsigned int	m_ControllerId;
		unsigned int	m_Action;
		unsigned int	m_Socket;
	};
}

#endif

