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

		Obstacle();
		~Obstacle();

		void			Init(uchar id, Grid* grid, Properties properties);
		virtual void	Reset();
		virtual void	Start(uchar pos);
		virtual void	Update(ulong deltaTime);

		uchar			GetType() { return m_Properties.m_Type; }
		uchar			GetValue() { return m_Properties.m_Value; }
		uchar			GetVelocity() { return m_Properties.m_Velocity; }
		uchar			GetSize() { return m_Properties.m_Size; }

		bool			IsEdge();

	private:
		virtual ulong	GetChangeTime() { return CHANGE_TIME_OB; }
		virtual ulong	GetMoveTime() { return MOVE_TIME_OB; }

		Properties		m_Properties;
	};
}

#endif // Obstacle_h__