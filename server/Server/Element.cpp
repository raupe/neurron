#include "ServerPCH.h"
#include "Element.h"

#include "Grid.h"

sv::Element::Element(uint id, Grid* grid, uint pos)
: m_Id(id)
, m_Pos(pos)
, m_NextPos(m_Pos)
, m_PassedTime(0)
, m_Moving(false)
, m_Grid(grid)
{

}

sv::Element::~Element()
{
}

void sv::Element::Start()
{
	m_Grid->AddElement(m_Pos, this);
}

void sv::Element::Update(ulong deltaTime)
{
	if(m_Moving)
	{
		m_PassedTime += deltaTime;
		if(m_PassedTime > CHANGE_TIME)
		{
			SetPos(m_NextPos);
		}
		if(m_PassedTime > MOVE_TIME)
		{
			if(m_DesiredPos != m_Pos)
			{
				m_PassedTime = 0;
				m_NextPos = m_DesiredPos;
			}
			else
			{
				m_Moving = false;
			}
		}
	}
}

int sv::Element::MoveRigth()
{
	m_DesiredPos = m_Grid->GetPosRight(m_NextPos);
	if(! m_Moving)
	{
		m_PassedTime = 0;
		m_NextPos = m_DesiredPos;
		m_Moving = true;
	}
	LOG1(DEBUG_MOVEMENT, "Move right to %i", m_DesiredPos);
	return m_DesiredPos;
}

int sv::Element::MoveLeft()
{
	m_DesiredPos = m_Grid->GetPosLeft(m_NextPos);
	if(! m_Moving)
	{
		m_PassedTime = 0;
		m_NextPos = m_DesiredPos;
		m_Moving = true;
	}
	LOG1(DEBUG_MOVEMENT, "Move left to %i", m_DesiredPos);
	return m_DesiredPos;
}

void sv::Element::SetPos(uint pos)
{ 
	m_Grid->RemoveElement(m_Pos, this);
	m_Pos = pos;
	m_Grid->AddElement(m_Pos, this);
}
