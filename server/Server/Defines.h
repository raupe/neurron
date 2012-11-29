#ifndef Defines_h__
#define Defines_h__

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
typedef unsigned short ushort;
typedef unsigned long ulong;

#define LOG_ERROR true
#define DEBUG_SERVER true
#define DEBUG_PROTOCOLL false
#define DEBUG_MSG false
#define DEBUG_WEBSOCKET false
#define DEBUG_TIME false
#define DEBUG_FLOW true
#define DEBUG_MOVEMENT false
#define DEBUG_OBSTACLES false
#define DEBUG_POINTS false


#ifdef DEBUG

#include "Output.h"
#include "stdio.h"

#define ASSERT(x,y) if(!(x)) sv::Output::Error(y);
#define LOG(x,y) if(x) sv::Output::Print(y);

#ifdef WIN32
#define LOG1(x,y,a) if(x) { char buf[1024]; sprintf_s(buf,y,a); sv::Output::Print(buf); }
#define LOG2(x,y,a,b) if(x) { char buf[1024]; sprintf_s(buf,y,a,b); sv::Output::Print(buf); }
#else // WIN32
#define LOG1(x,y,a) if(x) { char buf[1024]; sprintf(buf,y,a); sv::Output::Print(buf); }
#define LOG2(x,y,a,b) if(x) { char buf[1024]; sprintf(buf,y,a,b); sv::Output::Print(buf); }
#endif // WIN32

#else // DEBUG

#define ASSERT(x,y)
#define LOG(x,y)
#define LOG1(x,y,a)
#define LOG2(x,y,a,b)

#endif // DEBUG

#endif // Defines_h__