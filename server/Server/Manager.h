#ifndef Manager_h__
#define Manager_h__

namespace sv
{
	class Game;
	class PlayerManager;
	class ObstacleManager;
	class StatusManager;
	class Grid;

	class Manager
	{
	public:
		Manager(Game* game);
		virtual ~Manager();
		
		virtual void		Reset() = 0;
		virtual void		Start() = 0;
		virtual void		Update(ulong deltaTime) = 0;

	protected:
		Game*				GetGame();
		PlayerManager*		GetPlayerManager();
		ObstacleManager*	GetObstacleManager();
		StatusManager*		GetStatusManager();
		Grid*				GetGrid();

	private:
		Game*				m_Game;
	};
}

#endif // Manager_h__

