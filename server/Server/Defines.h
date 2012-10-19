#ifdef WIN32
#ifdef _DEBUG
#define DEBUG
#endif
#endif

typedef unsigned int uint;
typedef unsigned char uchar;

#ifdef DEBUG

#include "Output.h"
#define ASSERT(x,y) if(!(x)) sv::Output::Error(y); 

#else

#define ASSERT(x,y)

#endif
