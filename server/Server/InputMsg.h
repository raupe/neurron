#ifndef InputMsg_h__
#define ControllerMSg_h__

namespace sv
{
	
	enum EContrAction
	{
		eContrAction_Undifined,
		eContrAction_Start,
		eContrAction_Name,
		eContrAction_Abort,
		eContrAction_Right,
		eContrAction_Left,
		eContrAction_Up,
		eContrAction_Down,
		eContrAction_Clockwise,
		eContrAction_AntiClockwise,
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
		void			Reset();

		uchar			GetChannel() { return m_Channel; }
		uchar			GetControllerId() { return m_ControllerId; }
		uchar			GetAction() { return m_Action; }
		uchar*			GetData() { return m_Data; }

		int				GetSocket() { return m_Socket; }

	private:
		uchar			m_Channel;
		uchar			m_ControllerId;
		uchar			m_Action;
		uchar*			m_Data;

		int				m_Socket;
	};
}

#endif

