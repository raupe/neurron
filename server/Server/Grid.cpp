#include "ServerPCH.h"
#include "Grid.h"

#include "Player.h"
//													  1  2  3   4   5   6   7   8
const uchar sv::Grid::s_MapPlayerLanes[PLAYER_MAX] = {4, 8, 12, 12, 15, 12, 14, 16};

const uchar sv::Grid::s_MapStartPos[PLAYER_MAX][PLAYER_MAX] =
{
	{ 0, 0, 0, 0, 0, 0, 0, 0},
	{ 0, 4, 0, 0, 0, 0, 0, 0},
	{ 0, 4, 8, 0, 0, 0, 0, 0},
	{ 0, 3, 6, 9, 0, 0, 0, 0},
	{ 0, 3, 6, 9, 12, 0, 0, 0},
	{ 0, 2, 4, 6, 8, 10, 0, 0}, 
	{ 0, 2, 4, 6, 8, 10, 12, 0},
	{ 0, 2, 4, 6, 8, 10, 12, 14},
};

sv::Grid::Grid()
: m_NumberLanes(0)
, m_NumberPlayer(0)
, m_Fields(0)
, m_PlayerCount(0)
{
}


sv::Grid::~Grid()
{
}

void sv::Grid::Start(uchar numberPlayer)
{
	m_NumberPlayer = numberPlayer;
	m_NumberLanes = s_MapPlayerLanes[m_NumberPlayer-1];

	m_Fields = static_cast<Field*> ( malloc(m_NumberLanes * m_NumberPlayer * sizeof(Player*)) );
	m_PlayerCount = static_cast<uchar*> ( malloc(m_NumberLanes * sizeof(uchar)) );

	memset(m_PlayerCount, 0, m_NumberLanes * sizeof(uchar));
}

void sv::Grid::Reset()
{
	if(m_Fields)
	{
		free(m_Fields);
		m_Fields = 0;
	}
	if(m_PlayerCount)
	{
		free(m_PlayerCount);
		m_PlayerCount = 0;
	}
	m_NumberLanes = 0;
	m_NumberPlayer = 0;
}

uchar sv::Grid::GetInnerPos(uchar lane)
{
	return m_NumberLanes * (NUMBER_CIRCLES - 1) + lane;
}

bool sv::Grid::IsEdge(uchar pos)
{
	return pos < m_NumberLanes;
}

uchar sv::Grid::GetStartPos(uchar id)
{
	return s_MapStartPos[m_NumberPlayer-1][id-1];
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

void sv::Grid::AddPlayer(uchar pos, Player* player)
{
	uchar count = m_PlayerCount[pos]++;
	m_Fields[pos * m_NumberPlayer + count] = player;
}

void sv::Grid::RemovePlayer(uchar pos, Player* player)
{
	uchar count = m_PlayerCount[pos];
	uchar i;
	for(i=0; i<count; ++i)
	{
		if(m_Fields[pos * m_NumberPlayer + i] == player)
		{
			m_PlayerCount[pos]--;
			break;
		}
	}
	i++;
	for(; i<count; ++i)
	{
		m_Fields[pos * m_NumberPlayer + i-1] = m_Fields[pos * m_NumberLanes + i];
	}
}

void sv::Grid::GetPlayer(uchar pos, Player** player, uchar& count)
{
	count = m_PlayerCount[pos];
	memcpy(player, &m_Fields[pos * m_NumberPlayer], count * sizeof(Player*));
}