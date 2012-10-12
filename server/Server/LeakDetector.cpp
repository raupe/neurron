#include "ServerPCH.h"
#include "LeakDetector.h"

#ifdef DEBUG

typedef std::list<AllocInfo*> AllocList;
AllocList* g_AllocList;

void AddTrack(DWORD addr,  DWORD asize,  const char *fname, DWORD lnum)
{
	AllocInfo *info;

	if(!g_AllocList) {
		g_AllocList = new AllocList;
	}

	info = new AllocInfo;
	info->address = addr;
	strncpy_s(info->file, fname, sizeof(info->file)-1);
	info->line = lnum;
	info->size = asize;
	g_AllocList->insert(g_AllocList->begin(), info);
};

void RemoveTrack(DWORD addr)
{
	AllocList::iterator i;

	if(!g_AllocList)
		return;
	for(i = g_AllocList->begin(); i != g_AllocList->end(); i++)
	{
		AllocInfo* info = *i;
		if(info->address == addr)
		{
			g_AllocList->remove(info);
			delete(info);
			break;
		}
	}
};

void DumpUnfreed()
{
	AllocList::iterator i;
	DWORD totalSize = 0;
	char buf[1024];

	if(!g_AllocList)
		return;

	for(i = g_AllocList->begin(); i != g_AllocList->end(); i++) {
		sprintf_s(buf, "%-50s(%d)\t\tADDRESS %d\t%d unfreed\n", (*i)->file, (*i)->line, (*i)->address, (*i)->size);
		OutputDebugString(buf);
		totalSize += (*i)->size;
	}
	sprintf_s(buf, "-----------------------------------------------------------\n");
	OutputDebugString(buf);
	sprintf_s(buf, "Total Unfreed: %d bytes\n", totalSize);
	OutputDebugString(buf);

	AllocList* allocList = g_AllocList;
	g_AllocList = 0;
	delete(allocList);
};
//*/

#endif