#ifndef InputMsg_h__
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
		eContrAction_Up,
		eContrAction_Down,
		eContrAction_Heal,
		eContrAction_Polling,

		eContrAction_Max,
		eContrAction_CreateGame,
		eContrAction_DeleteGame,
	};

	class InputMsg
	{
	public:
		InputMsg();
		~InputMsg();

		void			SetContent(uchar* buffer, const uint& length, uint socket);
		void			SetContent(uint channel, uint controllerId, uint action, uint socket);

		uchar			GetChannel() { return m_Channel; }
		uchar			GetControllerId() { return m_ControllerId; }
		uchar			GetAction() { return m_Action; }
		int				GetSocket() { return m_Socket; }

	private:
		uchar			m_Channel;
		uchar			m_ControllerId;
		uchar			m_Action;
		int				m_Socket;
	};
}

#endif

