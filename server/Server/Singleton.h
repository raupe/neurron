#ifndef Singleton_h__
#define Singleton_h__

namespace sv
{
	template <class T>
	class Singleton
	{
	public:
		static T* Create()
		{
			s_Instance = S_NEW T();
			return s_Instance;
		}

		static void Destroy()
		{
			delete(s_Instance);
		}

		static T* Instance()
		{
			return s_Instance;
		}

	private:
		static T* s_Instance;
	};

	template <class T> T* Singleton<T>::s_Instance = 0;
}

#endif
