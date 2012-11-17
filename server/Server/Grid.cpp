#include "ServerPCH.h"
#include "Grid.h"

#include "Element.h"

const uchar sv::Grid::s_MapPlayerLanes[8] = {4, 8, 10, 12, 12, 14, 14, 16};

sv::Grid::Grid()
: m_NumberLanes(0)
, m_Grid(0)
{
}


sv::Grid::~Grid()
{
/*	uint numFields = m_NumberLanes * NUMBER_CIRCLES;
	for(uint i=0; i<numFields; ++i)
		delete(m_Grid[i]);
	free(m_Grid); */
}

void sv::Grid::Init(uchar numberPlayer)
{
	m_NumberLanes = s_MapPlayerLanes[numberPlayer-1];

/*	uint numFields = m_NumberLanes * NUMBER_CIRCLES;
	if(m_Grid)
	{
		for(uint i=0; i<numFields; ++i)
			delete(m_Grid[i]);
		free(m_Grid);
	}

	m_Grid = (Field**) alloca(sizeof(Field*) * numFields);
	for(uint i=0; i<numFields; ++i)
		m_Grid[i] = S_NEW Field(); */
}

uchar sv::Grid::GetInnerPos(uchar lane)
{
	return m_NumberLanes * (NUMBER_CIRCLES + 1) + lane;
}

bool sv::Grid::IsEdge(uchar pos)
{
	return pos < m_NumberLanes;
}

// change if left/right is also possible on the inner circles!
uchar sv::Grid::GetPosRight(uchar pos)
{
	if(pos != 0)
		return pos - 1;

	return pos + m_NumberLanes - 1;
}

uchar sv::Grid::GetPosLeft(uchar pos)
{
	if(pos+1 < m_NumberLanes)
		return pos + 1;

	return pos - m_NumberLanes + 1;
}

uchar sv::Grid::GetPosOut(uchar pos)
{
	ASSERT(pos >= m_NumberLanes, "Moving element out of grid");
	return pos - m_NumberLanes;
}

void sv::Grid::AddElement(uchar pos, Element* element)
{
	//m_Grid[pos]->m_Elements.push_back(element);
}

void sv::Grid::RemoveElement(uchar pos, Element* element)
{
	/*std::vector<Element*>& elements = m_Grid[pos]->m_Elements;
	for(int i=elements.size(); i >= 0; --i)
	{
		if(elements[i] == element)
		{
			elements.erase(elements.begin() + i);
			break;
		}
	}*/
}