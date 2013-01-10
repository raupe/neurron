#ifndef Constants_h__
#define Constants_h__

#define PLAYER_MAX 8

// Game
#define POLLING_RATE		 10000000	// 20 sec
#define	NAME_TIME			120000000	//  2 min
#define COUNTDOWN			 15000000	// 15 sec
#define PLAY_TIME			120000000	//  2 min

// Grid
#define NUMBER_CIRCLES 10

// Element
/*#define MOVE_TIME_PL		   400000	// 0.4 sec = MOVE_TIME_OB / 3
#define CHANGE_TIME_PL		   200000	// 0.2 sec
#define MOVE_TIME_OB		  1200000	// 1.2 sec
#define CHANGE_TIME_OB		  1100000	// 0.9 sec 
#define SPAWN_TIME_OB		  1200000	// 1.2 sec*/

#define MOVE_TIME_PL		   300000	// 0.4 sec = MOVE_TIME_OB / 2
#define CHANGE_TIME_PL		   100000	// 0.2 sec
#define MOVE_TIME_OB		   600000	// 1.2 sec
#define CHANGE_TIME_OB		   500000	// 0.9 sec
#define SPAWN_TIME_OB		  1200000	//

// Player
#define REVIVE_TIME			  5000000	// 5   sec

// StatusManager
#define ENERGY_MAX 100
#define PUNISH_POINTS 1000
#define HEAL_ENERGY 10

// ObstacleManager
#define LANE_MAX 16

// Highscore
#define HIGHSCORE_SIZE 10

#endif // Constants_h__