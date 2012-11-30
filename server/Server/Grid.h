#ifndef Grid_h__
#define Grid_h__

#include <vector>

namespace sv
{
	class Player;

	class Grid
	{
	public:
		static const uchar InvalidPos;

		enum eDir
		{
			eDir_Rigth,
			eDir_Left,
			eDir_Up,
			eDir_Down,

			eDir_Out,
		};

		Grid();
		~Grid();
		
		void			Reset();
		void			Start(uchar numberPlayer);

		uchar			GetInnerPos(uchar lane); 
		bool			IsEdge(uchar pos);
		uchar			GetStartPos(uchar id);
		uchar			GetNumberLanes() { return m_NumberLanes; }

		uchar			GetPos(uchar pos, uchar dir);

		void			AddPlayer(uchar pos, Player* player);
		void			RemovePlayer(uchar pos, Player* player);
		void			GetPlayer(uchar pos, Player** player, uchar& count);

	private:
		static const uchar s_MapPlayerLanes[];
		static const uchar s_MapStartPos[][PLAYER_MAX];
		
		uchar			GetPosClockwise(uchar pos);
		uchar			GetPosAntiClockwise(uchar pos);

		uchar			m_NumberLanes;
		uchar			m_NumberPlayer;
		uchar*			m_PlayerCount;
		
		typedef Player*	Field;
		Field*			m_Fields;
	};
}
#endif // Grid_h__
