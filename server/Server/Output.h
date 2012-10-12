#ifndef Output_h__
#define Output_h__

#include <string>

namespace sv
{
	class Output
	{
	public:
		static void Print(std::string msg);
		static void Error(std::string msg);
	};
}

#endif
