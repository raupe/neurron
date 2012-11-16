#ifndef Grid_h__
#define Grid_h__

#include <vector>

namespace sv
{
	class Element;

	class Grid
	{
	private:
		struct Field
		{
			std::vector<Element*> m_Elements;
		};

	public:
		Grid();
		~Grid();

		void		Init(uint numberLanes);

		uint		GetPosRight(uint pos);
		uint		GetPosLeft(uint pos);
		int			GetPosOut(uint pos);

		void		AddElement(int pos, Element* element);
		void		RemoveElement(int pos, Element* element);

	private:
		Field**			m_Grid;
		uint			m_NumberLanes;
	};
}
#endif // Grid_h__
