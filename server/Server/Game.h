#ifndef Game_h__
#define Game_h__

namespace sv
{
	class Game
	{
		friend class GameFactory;
	public:
		unsigned int		GetId() { return m_Id; }

		void				SetSocket(int s) { m_Socket = s; }
		int				GetSocket() { return m_Socket; }

	private:
		Game(unsigned int id);
		~Game();

		int m_Socket;
		unsigned int m_Id;
	};
}

#endif

