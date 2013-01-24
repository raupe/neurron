#ifndef Obstacle_h__
#define Obstacle_h__

#include "Element.h"

namespace sv
{
	class Obstacle : public Element
	{
	public:
		enum eObstacleType
		{
			eObstacleType_EnergyDown,
			eObstacleType_EnergyUp,
			eObstacleType_PointsUp,
		};

		struct Properties
		{
			uchar		m_Type;
			uchar		m_Value;
			uchar		m_Velocity;
			uchar		m_Size;
		};
		
		static Obstacle::Properties		GetProperties(uchar category);

		Obstacle();
		~Obstacle();
		
		void			Init(uchar id, Grid* grid, uchar category);
		virtual void	Reset();
		virtual void	Start(uchar pos);
		virtual void	Update(ulong deltaTime);

		uchar			GetCategory() { return m_Category; }

		bool			IsEdge();

	private:
		virtual ulong	GetChangeTime() { return CHANGE_TIME_OB; }
		virtual ulong	GetMoveTime() { return MOVE_TIME_OB; }

		uchar			m_Category;
	};
}

#endif // Obstacle_h__