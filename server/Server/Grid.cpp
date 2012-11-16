#include "ServerPCH.h"
#include "Grid.h"

#include "Element.h"

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

void sv::Grid::Init(uint numberLanes)
{
	m_NumberLanes = numberLanes;
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

// change if left/right is also possible on the inner circles!
uint sv::Grid::GetPosRight(uint pos)
{
	if(pos != 0)
		return pos - 1;

	return pos + m_NumberLanes - 1;
}

uint sv::Grid::GetPosLeft(uint pos)
{
	if(pos+1 < m_NumberLanes)
		return pos + 1;

	return pos - m_NumberLanes + 1;
}

int sv::Grid::GetPosOut(uint pos)
{
	if(pos >= m_NumberLanes)
		return pos - m_NumberLanes;

	return -1;
}

void sv::Grid::AddElement(int pos, Element* element)
{
	//m_Grid[pos]->m_Elements.push_back(element);
}

void sv::Grid::RemoveElement(int pos, Element* element)
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