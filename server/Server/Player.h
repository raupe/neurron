#ifndef Player_h__
#define Player_h__

#include "Element.h"

namespace sv
{
	class Grid;

	class Player : public Element
	{
	public:
		Player();
		~Player();
		
		void			Init(uchar id, Grid* grid, uchar color);
		virtual void	Reset();
		virtual void	Start(uchar pos);
		virtual void	Update(ulong deltaTime);

		uchar			GetColor() { return m_Color; }
		uchar			GetEnergy() { return m_Energy; }
		void			SetEnergy(uchar energy) { m_Energy = energy; }
		void			StartReviveCountdown();
	private:
		virtual void	SetPos(uchar pos);

		virtual ulong	GetChangeTime() { return CHANGE_TIME_PL; }
		virtual ulong	GetMoveTime() { return MOVE_TIME_PL; }

		uchar			m_Color;
		uchar			m_Energy;
		long			m_ReviveCountdown;
	};
}

#endif // Player_h__