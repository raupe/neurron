#ifndef Msg_h__
#define Msg_h__

#include <string>

namespace sv
{
	enum EMsgType
	{
		eMsgType_Polling,
		eMsgType_Init = 1,

		eMsgType_Name,
		eMsgType_Abort,
		eMsgType_Countdown,
		eMsgType_Join,
		eMsgType_Start,

		eMsgType_Move,
		eMsgType_Heal,
		eMsgType_Obstacle,
		eMsgType_Collision,
		eMsgType_End,

		// Controller Msgs
		eMsgType_Response, // Not used as msg-type
		eMsgType_ResponseStart,
		eMsgType_ResponseStatus,
	};

	class Msg
	{
	public:
		Msg(uchar type);
		virtual	~Msg();

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length) = 0;

	protected:
		void			Visit(uchar i, uchar* buffer, uint& pos, const uint& length);

		uchar			m_Type;
	};

	class PollingMsg : public Msg
	{
	public:
		PollingMsg();
		virtual ~PollingMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	};

	class InitMsg : public Msg
	{
	public:
		InitMsg(uchar channel);
		virtual ~InitMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

	private:
		uchar			m_Channel;
	};

	class NameMsg : public Msg
	{
	public:
		NameMsg();
		virtual ~NameMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	};

	class AbortMsg : public Msg
	{
	public:
		AbortMsg();
		virtual ~AbortMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	};

	class CountdownMsg : public Msg
	{
	public:
		CountdownMsg(uchar length, const std::string& name);
		virtual ~CountdownMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		uchar			m_Length;
		std::string		m_Name;
	};

	class JoinMsg : public Msg
	{
	public:
		JoinMsg(uchar id, uchar color);
		virtual ~JoinMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		uchar			m_Id;
		uchar			m_Color;
	};

	class StartMsg : public Msg
	{
	public:
		StartMsg(uchar number, uchar lanes);
		virtual ~StartMsg();

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

		void			SetPos(uchar* pos);

	private:
		uchar			m_Number;
		uchar			m_NumberLanes;
		uchar*			m_Pos;
	};

	class MoveMsg : public Msg
	{
	public:
		MoveMsg(uchar playerId, uchar pos);
		virtual ~MoveMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

	private:
		uchar			m_PLayerId;
		uchar			m_Pos;
	};

	class HealMsg : public Msg
	{
	public:
		HealMsg(uchar playerId, uchar targetCount);
		virtual ~HealMsg();

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
		void			SetTargets(uchar* targetIds);

	private:
		uchar			m_PlayerId;
		uchar			m_TagetCount;
		uchar*			m_TagetIds;
	};

	class ObstacleMsg : public Msg
	{
	public:
		ObstacleMsg();
		virtual ~ObstacleMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
		
		void			AddObstacle(uchar obstacleId, uchar category, uchar pos);

	private:
		uchar			m_Number;
		uchar			m_ObstacleId[LANE_MAX];
		uchar			m_Category[LANE_MAX];
		uchar			m_Pos[LANE_MAX];
	};

	class CollisionMsg : public Msg
	{
	public:
		CollisionMsg(uchar obstacleId, uchar obstacleCategory, uchar playerCount);
		virtual ~CollisionMsg();

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
		void			SetPlayer(uchar* playerIds);
	private:
		uchar			m_ObstacleId;
		uchar			m_ObstacleCategory;
		uchar			m_PlayerCount;
		uchar*			m_PlayerIds;
	};

	class EndMsg : public Msg
	{
	public:
		EndMsg(ushort points);
		virtual ~EndMsg();

		void			SetPercent(uchar index, uchar colors, uchar percent);
		void			SetHighscore(uchar index, std::string names, ushort points);

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		ushort			m_Points;

		uchar			m_Colors[PLAYER_MAX];
		uchar			m_Percents[PLAYER_MAX];

		char**			m_HighscoreNames;
		ushort			m_HighscorePoints[3];
	};

	//////////////////////////////////////////////////////////////////////////////////////

	class ResponseStartMsg : public Msg
	{
	public:
		ResponseStartMsg(uchar id, uchar color, bool enterName);
		virtual ~ResponseStartMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		uchar			m_Id;
		uchar			m_Color;
		uchar			m_EnterName;
	};
	
	class ResponseStatusMsg : public Msg
	{
	public:
		enum
		{
			eResponseStatus_Ok,
			eResponseStatus_NotRunning,
			eResponseStatus_AlreadyRunning,
			eResponseStatus_NoGame,
		};

		ResponseStatusMsg(uchar status);
		virtual ~ResponseStatusMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		uchar			m_Status;
	};
}

#endif

