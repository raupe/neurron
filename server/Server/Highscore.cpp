#include "ServerPCH.h"
#include "Highscore.h"

#include "Engine.h"

#include <fstream>

sv::Highscore::Highscore()
{
}


sv::Highscore::~Highscore()
{
}

bool sv::Highscore::AddScore(uchar playerCount, ushort score, const std::string& name)
{
	Entry entry;
	entry.m_Score = score;
	entry.m_Name = name;
	bool top = false;

	uchar pos = 0;
	while(pos < HIGHSCORE_SIZE)
	{
		if(entry.m_Score > m_Highscore[playerCount-1][pos].m_Score)
			break;
		else
			pos++;
	}

	if(pos == HIGHSCORE_SIZE)
		return false;

	for(char i=HIGHSCORE_SIZE-1; i>pos; --i)
	{
		m_Highscore[playerCount-1][i] = m_Highscore[playerCount-1][i-1];
	}
	m_Highscore[playerCount-1][pos] = entry;

	SaveHighscore();
	return true;
}

void sv::Highscore::LoadHighscore()
{
	char buffer[1024];
	Engine::Instance()->GetPath("../Highscore.txt", buffer, sizeof(buffer));

	std::ifstream inFile;
	inFile.open(buffer);

	bool success = ! inFile.fail();
	if(success)
	{
		ushort score;
		uchar posScore[PLAYER_MAX];
		memset(posScore, 0, sizeof(posScore));
		uchar posBuf = 0;
		uchar playerCount = 0;
		char c = inFile.get();

		while(inFile.good())
		{
			score = 0;
			playerCount = 0;

			posBuf = 0;
			while(c == '\n' || c == 'r' || c == ' ' || c == '\t')
				c = inFile.get();

			while(c != '\n' && c != '\r' && c != ' ' && c != '\t' && inFile.good())
			{
				buffer[posBuf++] = c;
				c = inFile.get();
			}
			buffer[posBuf] = 0;
			playerCount = atoi(buffer);

			posBuf = 0;
			while(c == '\n' || c == 'r' || c == ' ' || c == '\t')
				c = inFile.get();

			while(c != '\n' && c != '\r' && c != ' ' && c != '\t' && inFile.good())
			{
				buffer[posBuf++] = c;
				c = inFile.get();
			}
			buffer[posBuf] = 0;
			score = atoi(buffer);

			posBuf = 0;
			while(c == '\n' || c == 'r' || c == ' ' || c == '\t')
				c = inFile.get();

			while(c != '\n' && c != '\r' && c != '\t' && inFile.good())
			{
				buffer[posBuf++] = c;
				c = inFile.get();
			}
			buffer[posBuf] = 0;

			if(score && strlen(buffer) && posScore[playerCount] < HIGHSCORE_SIZE)
			{
				m_Highscore[playerCount][posScore[playerCount]].m_Score = score;
				m_Highscore[playerCount][posScore[playerCount]].m_Name = buffer;
				posScore[playerCount]++;
			}
		}
		inFile.close();
	}
}

void sv::Highscore::SaveHighscore()
{
	
	char buffer[1024];
	Engine::Instance()->GetPath("../Highscore.txt", buffer, sizeof(buffer));

	std::ofstream outFile;
	outFile.open(buffer);

	bool success = ! outFile.fail();
	if(success)
	{
		for(short i=0; i<PLAYER_MAX; ++i)
		{
			for(uchar j=0; j<HIGHSCORE_SIZE; ++j)
			{
				if(! m_Highscore[i][j].m_Score)
					break;

				outFile << i << ' ';
				outFile << m_Highscore[i][j].m_Score << ' ';
				outFile << m_Highscore[i][j].m_Name << '\n';
			}
		}
		outFile.close();
	}
}
