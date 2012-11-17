#ifndef Element_h__
#define Element_h__

namespace sv
{
	class Grid;

	class Element
	{
	public:
		Element();
		~Element();
		void			Init(uchar id, Grid* grid, uchar pos);
		
		virtual void	Start();
		virtual void	Update(ulong deltaTime);


		uchar			GetId() { return m_Id; }
		uchar			GetPos() { return m_Pos; }
		
		uchar			MoveRigth();
		uchar			MoveLeft();
		uchar			MoveOut();

	protected:
		void			SetPos(uchar pos);

		uchar			m_Id;
		
		uchar			m_Pos;
		uchar			m_NextPos;
		uchar			m_DesiredPos;
		
		ulong			m_PassedTime;
		bool			m_Moving;

		Grid*			m_Grid;
	};
}

#endif