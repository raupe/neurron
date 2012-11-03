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
		eContrAction_Front,
		eContrAction_Back,

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

		uint			GetChannel() { return m_Channel; }
		uint			GetControllerId() { return m_ControllerId; }
		uint			GetAction() { return m_Action; }
		uint			GetSocket() { return m_Socket; }

	private:
		unsigned int	m_Channel;
		unsigned int	m_ControllerId;
		unsigned int	m_Action;
		unsigned int	m_Socket;
	};
}

#endif

