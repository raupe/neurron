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

		void		Init(uchar numberPlayer);

		uchar		GetInnerPos(uchar lane); 
		bool		IsEdge(uchar pos);
		uchar		GetNumberLanes() { return m_NumberLanes; }

		uchar		GetPosRight(uchar pos);
		uchar		GetPosLeft(uchar pos);
		uchar		GetPosOut(uchar pos);

		void		AddElement(uchar pos, Element* element);
		void		RemoveElement(uchar pos, Element* element);

	private:
		static const uchar s_MapPlayerLanes[];

		Field**			m_Grid;
		uchar			m_NumberLanes;
	};
}
#endif // Grid_h__
