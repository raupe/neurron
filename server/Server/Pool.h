#ifndef Pool_h__
#define Pool_h__

#include <stdlib.h>

namespace sv
{
	template <class T>
	class Pool
	{
	private:
		struct Entry
		{
			T*		m_Object;
			Entry*	m_Next;
		};

	public:
		typedef Entry* Iterator;

		Pool();
		~Pool();

		void		Init(uint size);

		T*			Get();
		void		Free (T* object);

		Iterator	First() { return m_UsedEntries; }
		T*			Get(Iterator iterator) { return iterator->m_Object; }
		Iterator	Next(Iterator iterator) { return iterator->m_Next; }

	private:
		uint		m_Size;
		Entry*		m_Entries;
		Entry*		m_FreeEntries;
		Entry*		m_UsedEntries;
	};
}

//////////////////////////////////////////////////////////////////////////////////////////////////7

template <class T>
sv::Pool<T>::Pool()
: m_Size(0)
, m_UsedEntries(0)
{
}

template <class T>
void sv::Pool<T>::Init(uint size)
{
	m_Size = size;

	m_Entries = static_cast<Entry*>(malloc(sizeof(Entry) * m_Size));

	for(uint i=0; i<m_Size-1; ++i)
	{
		m_Entries[i].m_Next = &m_Entries[i+1];
		m_Entries[i].m_Object = S_NEW T();
	}
	m_FreeEntries = &m_Entries[0];

	m_Entries[m_Size-1].m_Next = 0;
	m_Entries[m_Size-1].m_Object = S_NEW T();
}

template <class T>
sv::Pool<T>::~Pool()
{
	for(uint i=0; i<m_Size; ++i)
		delete(m_Entries[i].m_Object);
	free(m_Entries);
}

template <class T>
T* sv::Pool<T>::Get()
{
	ASSERT(m_FreeEntries, "Pool too small.");

	Entry* entry = m_FreeEntries;
	m_FreeEntries = m_FreeEntries->m_Next;

	entry->m_Next = m_UsedEntries;
	m_UsedEntries = entry;

	return entry->m_Object;
}

template <class T>
void sv::Pool<T>::Free (T* object)
{
	Entry** formerPt = &m_UsedEntries;
	Entry* entry = m_UsedEntries;
	while(entry)
	{
		if(entry->m_Object == object)
		{
			*formerPt = entry->m_Next;

			entry->m_Next = m_FreeEntries;
			m_FreeEntries = entry;
		}
		formerPt = &entry->m_Next;
		entry = entry->m_Next;
	}
}

#endif // Pool_h__