#ifndef Player_h__
#define Player_h__

namespace sv
{
	class Player
	{
	public:
		Player(uint id, uint color);
		~Player();

		uint	GetId() { return m_Id; }
		uint	GetColor() { return m_Color; }
		uint	GetPos() { return m_Pos; }
		
		void	SetPos(uint pos);
		void	SetNextPos(uint pos);

		void	Update(ulong deltaTime);
	private:
		uint	m_Id;
		uint	m_Color;

		uint	m_Pos;
		uint	m_NextPos;

		uint	m_PassedTime;
		bool	m_Moving;
	};
}

#endif // Player_h__