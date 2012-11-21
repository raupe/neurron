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
		void			Init(uchar id, Grid* grid, uchar pos, Properties properties);

		virtual void	Update(ulong deltaTime);

		uchar			GetType() { return m_Properties.m_Type; }
		uchar			GetValue() { return m_Properties.m_Value; }
		uchar			GetVelocity() { return m_Properties.m_Velocity; }
		uchar			Getsize() { return m_Properties.m_Size; }

	private:
		Properties		m_Properties;
	};
}

#endif // Obstacle_h__