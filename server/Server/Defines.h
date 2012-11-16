//#ifdef WIN32
#ifdef _DEBUG
#define DEBUG
#endif
//#endif

#ifdef WIN32
#ifdef DEBUG
#define DEBUG_WIN
#endif
#endif

typedef unsigned int uint;
typedef unsigned char uchar;
typedef unsigned long ulong;

#define LOG_ERROR true
#define DEBUG_SERVER false
#define DEBUG_PROTOCOLL false
#define DEBUG_MSG false
#define DEBUG_WEBSOCKET false
#define DEBUG_TIME false
#define DEBUG_FLOW false
#define DEBUG_MOVEMENT true


#ifdef DEBUG

#include "Output.h"
#include "stdio.h"

#define ASSERT(x,y) if(!(x)) sv::Output::Error(y);
#define LOG(x,y) if(x) sv::Output::Print(y);

#ifdef WIN32
#define LOG1(x,y,z) if(x) { char buf[1024]; sprintf_s(buf,y,z); sv::Output::Print(buf); }
#else
#define LOG1(x,y,z) if(x) { char buf[1024]; sprintf(buf,y,z); sv::Output::Print(buf); }
#endif

#else

#define ASSERT(x,y)
#define LOG(x,y)
#define LOG1(x,y,z)

#endif
