#ifndef Element_h__
#define Element_h__

namespace sv
{
	class Grid;

	class Element
	{
	public:
		Element(uint id, Grid* grid, uint pos);
		~Element();
		
		virtual void	Start();
		virtual void	Update(ulong deltaTime);

		uint			GetId() { return m_Id; }
		uint			GetPos() { return m_Pos; }
		
		int				MoveRigth();
		int				MoveLeft();

	protected:
		void			SetPos(uint pos);

	private:

		uint			m_Id;
		
		uint			m_Pos;
		uint			m_NextPos;
		uint			m_DesiredPos;
		
		uint			m_PassedTime;
		bool			m_Moving;

		Grid*			m_Grid;
	};
}

#endif