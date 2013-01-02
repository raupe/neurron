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

bool sv::Highscore::AddScore(ushort score, const std::string& name)
{
	Entry entry;
	entry.m_Score = score;
	entry.m_Name = name;
	bool top = false;

	uchar pos = 0;
	while(pos < HIGHSCORE_SIZE)
	{
		if(entry.m_Score > m_Highscore[pos].m_Score)
			break;
		else
			pos++;
	}

	if(pos == HIGHSCORE_SIZE)
		return false;

	for(char i=HIGHSCORE_SIZE-1; i>pos; --i)
	{
		m_Highscore[i] = m_Highscore[i-1];
	}
	m_Highscore[pos] = entry;

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
		uchar posScore = 0;
		uchar posBuf = 0;
		char c = inFile.get();

		while(inFile.good() && posScore < HIGHSCORE_SIZE)
		{
			score = 0;
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

			while(c != '\n' && c != '\r' && c != ' ' && c != '\t' && inFile.good())
			{
				buffer[posBuf++] = c;
				c = inFile.get();
			}
			buffer[posBuf] = 0;

			if(score && strlen(buffer))
			{
				m_Highscore[posScore].m_Score = score;
				m_Highscore[posScore].m_Name = buffer;
				posScore++;
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
		for(uchar i=0; i<HIGHSCORE_SIZE; ++i)
		{
			if(! m_Highscore[i].m_Score)
				break;

			outFile << m_Highscore[i].m_Score << ' ';
			outFile << m_Highscore[i].m_Name << '\n';
		}
		outFile.close();
	}
}
