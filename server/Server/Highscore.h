#ifndef Highscore_h__
#define Highscore_h__

namespace sv
{
	class Highscore
	{
	private:
		struct Entry
		{
			Entry() : m_Score(0), m_Name("") {}

			ushort			m_Score;
			std::string		m_Name;
		};

	public:
		Highscore();
		~Highscore();

		bool				AddScore(uchar playerCount, ushort score, const std::string& name);

		void				LoadHighscore();
		void				SaveHighscore();

		std::string			GetName(uchar playerCount, uchar index) { return m_Highscore[playerCount-1][index].m_Name; }
		ushort				GetScore(uchar playerCount, uchar index) { return m_Highscore[playerCount-1][index].m_Score; }

	private:
		Entry				m_Highscore[PLAYER_MAX][HIGHSCORE_SIZE];
	};
}

#endif