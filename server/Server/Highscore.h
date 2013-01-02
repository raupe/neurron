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

		bool				AddScore(ushort score, const std::string& name);

		void				LoadHighscore();
		void				SaveHighscore();

	private:
		Entry				m_Highscore[HIGHSCORE_SIZE];
	};
}

#endif