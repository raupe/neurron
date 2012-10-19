#ifndef LeakDetector_h__
#define LeakDetector_h__

#include "Defines.h"

#ifdef DEBUG

#include <Windows.h>
#include <list>

struct AllocInfo
{
	DWORD	address;
	DWORD	size;
	char	file[128];
	DWORD	line;
};

void AddTrack(DWORD addr,  DWORD asize,  const char *fname, DWORD lnum);
void RemoveTrack(DWORD addr);
void DumpUnfreed();

inline void * __cdecl operator new(unsigned int size, const char *file, int line)
{
	void *ptr = (void *)malloc(size);
	AddTrack((DWORD)ptr, size, file, line);
	return(ptr);
};

inline void __cdecl operator delete(void* p, const char *file, int line)
{
	RemoveTrack((DWORD)p);
	free(p);
}

inline void __cdecl operator delete(void *p)
{
	RemoveTrack((DWORD)p);
	free(p);
};

#define S_NEW new(__FILE__, __LINE__)

#else

#define S_NEW new

#endif

#endif // LeakDetector_h__