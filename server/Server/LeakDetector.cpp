#include "ServerPCH.h"
#include "LeakDetector.h"

/*
typedef std::list<AllocInfo*> AllocList;
AllocList* allocList;

void AddTrack(DWORD addr,  DWORD asize,  const char *fname, DWORD lnum)
{
	AllocInfo *info;

	if(!allocList) {
		allocList = new AllocList;
	}

	info = new AllocInfo;
	info->address = addr;
	strncpy_s(info->file, fname, 63);
	info->line = lnum;
	info->size = asize;
	allocList->insert(allocList->begin(), info);
};

void RemoveTrack(DWORD addr)
{
	AllocList::iterator i;

	if(!allocList)
		return;
	for(i = allocList->begin(); i != allocList->end(); i++)
	{
		if((*i)->address == addr)
		{
			allocList->remove((*i));
			break;
		}
	}
};

void DumpUnfreed()
{
	AllocList::iterator i;
	DWORD totalSize = 0;
	char buf[1024];

	if(!allocList)
		return;

	for(i = allocList->begin(); i != allocList->end(); i++) {
		sprintf(buf, "%-50s:\t\tLINE %d,\t\tADDRESS %d\t%d unfreed\n", (*i)->file, (*i)->line, (*i)->address, (*i)->size);
		OutputDebugString(buf);
		totalSize += (*i)->size;
	}
	sprintf(buf, "-----------------------------------------------------------\n");
	OutputDebugString(buf);
	sprintf(buf, "Total Unfreed: %d bytes\n", totalSize);
	OutputDebugString(buf);
};
*/