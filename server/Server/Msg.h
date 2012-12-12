#ifndef Msg_h__
#define Msg_h__

#include <string>

namespace sv
{
	enum EMsgType
	{
		eMsgType_Polling,
		eMsgType_Init = 1,
		eMsgType_Countdown,
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

	class CountdownMsg : public Msg
	{
	public:
		CountdownMsg(uchar length);
		virtual ~CountdownMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		uchar			m_Length;
	};

	class StartMsg : public Msg
	{
	public:
		StartMsg(uchar number, uchar lanes);
		virtual ~StartMsg();

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

		void			SetColors(uchar* colors);
		void			SetPos(uchar* pos);

	private:
		uchar			m_Number;
		uchar			m_NumberLanes;
		uchar*			m_Colors;
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
		ObstacleMsg(uchar obstacleId, uchar category, uchar pos);
		virtual ~ObstacleMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);

	private:
		uchar			m_ObstacleId;
		uchar			m_Category;
		uchar			m_Pos;
	};

	class CollisionMsg : public Msg
	{
	public:
		CollisionMsg(uchar obstacleId, uchar playerCount);
		virtual ~CollisionMsg();

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
		void			SetPlayer(uchar* playerIds);
	private:
		uchar			m_ObstacleId;
		uchar			m_PlayerCount;
		uchar*			m_PlayerIds;
	};

	class EndMsg : public Msg
	{
	public:
		EndMsg(ushort points);
		virtual ~EndMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		ushort			m_Points;
	};

	//////////////////////////////////////////////////////////////////////////////////////

	class ResponseStartMsg : public Msg
	{
	public:
		ResponseStartMsg(uchar id, uchar color);
		virtual ~ResponseStartMsg() {}

		virtual void	GetBuffer(uchar* buffer, uint& pos, const uint& length);
	private:
		uchar			m_Id;
		uchar			m_Color;
	};
	
	class ResponseStatusMsg : public Msg
	{
	public:
		enum
		{
			eResponseStatus_Ok,
			eResponseStatus_NotRunning,
			eResponseStatus_Failed,
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

