#include "ServerPCH.h"
#include "Output.h"

#include <iostream>

void sv::Output::Print(std::string msg)
{
	std::cout << msg << '\n';
}