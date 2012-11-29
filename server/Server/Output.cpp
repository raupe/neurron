#include "ServerPCH.h"
#include "Output.h"

#include <iostream>

void sv::Output::Print(std::string msg)
{
	std::cerr << msg << '\n';
}

void sv::Output::Error(std::string msg)
{
	std::cerr << msg << '\n';

#ifdef DEBUG_WIN
	std::cout << "Break? [Y/N]";
	char answ;
	std::cin >> answ;
	if(answ == 'y' || answ == 'Y')
	{
		DebugBreak();
	}
#endif
}