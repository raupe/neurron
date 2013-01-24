#include "ServerPCH.h"
#include "Msg.h"

#include <stdlib.h>
#include <string.h>

sv::Msg::Msg(uchar type)
: m_Type(type)
{
}

sv::Msg::~Msg()
{
}

void sv::Msg::Visit(uchar i, uchar* buffer, uint& pos, const uint& length)
{
	ASSERT(pos < length, "Msg too long");
	buffer[pos++] = i;
}

sv::PollingMsg::PollingMsg()
: Msg(eMsgType_Polling)
{
}

void sv::PollingMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
}

sv::InitMsg::InitMsg(uchar channel)
: Msg(eMsgType_Init)
, m_Channel(channel)
{
}

void sv::InitMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);

	Visit(m_Channel, buffer, pos, length);
}

sv::NameMsg::NameMsg()
: Msg(eMsgType_Name)
{
}

void sv::NameMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
}

sv::AbortMsg::AbortMsg()
: Msg(eMsgType_Abort)
{
}

void sv::AbortMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
}

sv::CountdownMsg::CountdownMsg(uchar length, const std::string& name)
: Msg(eMsgType_Countdown)
, m_Length(length)
, m_Name(name)
{
}

void sv::CountdownMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_Length, buffer, pos, length);
	for(uint i=0; i<m_Name.length(); ++i)
		Visit(m_Name[i], buffer, pos, length);
}

sv::JoinMsg::JoinMsg(uchar id, uchar color)
: Msg(eMsgType_Join)
, m_Id(id)
, m_Color(color)
{
}

void sv::JoinMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_Id, buffer, pos, length);
	Visit(m_Color, buffer, pos, length);
}

sv::StartMsg::StartMsg(uchar number, uchar lanes)
: Msg(eMsgType_Start)
, m_Number(number)
, m_NumberLanes(lanes)
{
	m_Pos = (uchar*) malloc(m_Number * sizeof(uchar));
}

sv::StartMsg::~StartMsg()
{
	free(m_Pos);
}

void sv::StartMsg::SetPos(uchar* pos)
{
	for(uint i=0; i< m_Number; ++i)
		m_Pos[i] = pos[i];
}

void sv::StartMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_Number, buffer, pos, length);
	Visit(m_NumberLanes, buffer, pos, length);
	for(uint i=0; i< m_Number; ++i)
	{
		Visit(m_Pos[i], buffer, pos, length);
	}
}

sv::MoveMsg::MoveMsg(uchar playerId, uchar pos)
: Msg(eMsgType_Move)
, m_PLayerId(playerId)
, m_Pos(pos)
{
}

void sv::MoveMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_PLayerId, buffer, pos, length);
	Visit(m_Pos, buffer, pos, length);
}

sv::HealMsg::HealMsg(uchar playerId, uchar targetCount)
: Msg(eMsgType_Heal)
, m_PlayerId(playerId)
, m_TagetCount(targetCount)
{
	m_TagetIds = static_cast<uchar*>( malloc(m_TagetCount * sizeof(uchar)) );
}

sv::HealMsg::~HealMsg()
{
	free(m_TagetIds);
}

void sv::HealMsg::SetTargets(uchar* targetIds)
{
	memcpy(m_TagetIds, targetIds, m_TagetCount);
}

void sv::HealMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_PlayerId, buffer, pos, length);
	Visit(m_TagetCount, buffer, pos, length);
	for(uchar i=0; i<m_TagetCount; ++i)
		Visit(m_TagetIds[i], buffer, pos, length);
}

sv::ObstacleMsg::ObstacleMsg()
: Msg(eMsgType_Obstacle)
, m_Number(0)
{
}

void sv::ObstacleMsg::AddObstacle(uchar obstacleId, uchar category, uchar pos)
{
	m_ObstacleId[m_Number] = obstacleId;
	m_Category[m_Number] = category;
	m_Pos[m_Number] = pos;
	m_Number++;
}

void sv::ObstacleMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_Number, buffer, pos, length);
	for(uchar i=0; i<m_Number; ++i)
	{
		Visit(m_ObstacleId[i], buffer, pos, length);
		Visit(m_Category[i], buffer, pos, length);
		Visit(m_Pos[i], buffer, pos, length);
	}
}

sv::CollisionMsg::CollisionMsg(uchar obstacleId, uchar obstacleCategory, uchar playerCount)
: Msg(eMsgType_Collision)
, m_ObstacleId(obstacleId)
, m_ObstacleCategory(obstacleCategory)
, m_PlayerCount(playerCount)
{
	m_PlayerIds = static_cast<uchar*>( malloc(m_PlayerCount * sizeof(uchar)) );
}

sv::CollisionMsg::~CollisionMsg()
{
	free(m_PlayerIds);
}

void sv::CollisionMsg::SetPlayer(uchar* playerIds)
{
	memcpy(m_PlayerIds, playerIds, m_PlayerCount);
}

void sv::CollisionMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	Visit(m_ObstacleId, buffer, pos, length);
	Visit(m_ObstacleCategory, buffer, pos, length);
	Visit(m_PlayerCount, buffer, pos, length);
	for(uchar i=0; i<m_PlayerCount; ++i)
		Visit(m_PlayerIds[i], buffer, pos, length);
}

sv::EndMsg::EndMsg(ushort points)
: Msg(eMsgType_End)
, m_Points(points)
{
	m_HighscoreNames = (char**) malloc(3 * sizeof(char*));

	memset(m_Colors, 0, sizeof(m_Colors));
	memset(m_Percents, 0, sizeof(m_Percents));
	memset(m_HighscoreNames, 0, 3 * sizeof(char*));
	memset(m_HighscorePoints, 0, sizeof(m_HighscorePoints));
}

sv::EndMsg::~EndMsg()
{
	for(uchar i=0; i<3; ++i)
	{
		free(m_HighscoreNames[i]);
		m_HighscoreNames[i] = 0;
	}
	free(m_HighscoreNames);
}

void sv::EndMsg::SetPercent(uchar index, uchar colors, uchar percent)
{
	m_Colors[index] = colors;
	m_Percents[index] = percent;
}

void sv::EndMsg::SetHighscore(uchar index, std::string name, ushort points)
{
	free(m_HighscoreNames[index]);

	m_HighscoreNames[index] = (char*) malloc(name.length() + 1 * sizeof(char));
#ifdef WIN32
	strcpy_s(m_HighscoreNames[index], name.length() + 1, name.c_str());
#else
	strcpy(m_HighscoreNames[index], name.c_str());
#endif
	m_HighscorePoints[index] = points;
}

void sv::EndMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type, buffer, pos, length);
	
	uchar first = (m_Points >> 8) & 0xFF;
	uchar second = m_Points & 0xFF;
	Visit(first, buffer, pos, length);
	Visit(second, buffer, pos, length);

	uchar i = 0;
	while(m_Colors[i])
	{
		Visit(m_Colors[i], buffer, pos, length);
		Visit(m_Percents[i], buffer, pos, length);
		i++;
	}

	uchar len;
	for(i=0; i<3; ++i)
	{
		len = strlen(m_HighscoreNames[i]);
		Visit(len, buffer, pos, length);

		for(uchar j=0; j<len; ++j)
			Visit(m_HighscoreNames[i][j], buffer, pos, length);

		first = (m_HighscorePoints[i] >> 8) & 0xFF;
		second = m_HighscorePoints[i] & 0xFF;
		Visit(first, buffer, pos, length);
		Visit(second, buffer, pos, length);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////

sv::ResponseStartMsg::ResponseStartMsg(uchar id, uchar color, bool enterName)
: Msg(eMsgType_ResponseStart)
, m_Id(id)
, m_Color(color)
, m_EnterName(enterName? 1 : 0)
{
}

void sv::ResponseStartMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type - eMsgType_Response, buffer, pos, length);
	
	Visit(m_Id, buffer, pos, length);
	Visit(m_Color, buffer, pos, length);
	Visit(m_EnterName, buffer, pos, length);
}

sv::ResponseStatusMsg::ResponseStatusMsg(uchar status)
: Msg(eMsgType_ResponseStatus)
, m_Status(status)
{
}

void sv::ResponseStatusMsg::GetBuffer(uchar* buffer, uint& pos, const uint& length)
{
	Visit(m_Type - eMsgType_Response, buffer, pos, length);

	Visit(m_Status, buffer, pos, length);
}