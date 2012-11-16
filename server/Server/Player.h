#ifndef Player_h__
#define Player_h__

#include "Element.h"

namespace sv
{
	class Grid;

	class Player : public Element
	{
	public:
		Player(uint id, uint color, Grid* grid, uint pos);
		~Player();
		
		virtual void	Update(ulong deltaTime);

		uint	GetColor() { return m_Color; }
	private:
		uint	m_Color;
	};
}

#endif // Player_h__