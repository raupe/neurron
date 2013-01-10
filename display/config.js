/* global namespace */
window.display = {

	views: {},
    logic: {},
    load_view: {}
};

/* configurations */
window.config = {

	server				: 'game.neurron.com',
	port				: '2020',

    errorURL            : 'http://neurron.com/notify/error2.php',

    gameTime            : 2,		// Minutes


    factor				: 4,		// offset for statusbar and grid
    amountToHeal		: 10,		// how much a player can heal
    punishPoints		: 1000,
    deadTime            : 5,


    audio				: true,	// option #1
    audioFading			: 10,		// 10 seconds
    audioVolume			: 10,		// default value


	circleOffset		: 100,
	distanceToUser		: 150,

    circles				: 10,		// sync with server
    frames				: 30,


    duration: {

		moveTime		: 600		// 1.2s, sync with server
		// aniTime			:
    },


	playerSize			: 80,
	frameDuration		: 60,		// base ani duration


	assets: {

		image: {

            // player
			player_1	: 'assets/player/trans.gif',//{ src:	'assets/player/ron_red_80.png',    width: 80 },	// red
            player_2    : { src:	'assets/player/ron_blue_80.png',   width: 80 },	// blue
            player_3    : { src:	'assets/player/ron_green_80.png',  width: 80 },	// green
            player_4    : { src:	'assets/player/ron_yellow_80.png', width: 80 },	// yellow
            player_5    : { src:	'assets/player/ron_lila_80.png',   width: 80 },	// lila
            player_6    : { src:	'assets/player/ron_orange_80.png', width: 80 },	// orange
            player_7    : { src:	'assets/player/ron_turq_80.png',   width: 80 },	// turq
            player_8    : { src:	'assets/player/ron_pink_80.png',   width: 80 },	// pink
            player_dead : { src:	'assets/player/ron_grey_80.png',   width: 80 },	// grey
            player_trans:			'assets/player/trans.gif',						// trans


			// obstacle
			damage		: 'assets/damage/damage.png',
			heal		: 'assets/heal/heal.png',
			points		: 'assets/points/points.png',

			// collisions
			damage_col  : {	src: 'assets/damage/damage_col.png',	width: 100 },
			points_col  : {	src: 'assets/points/points_col.png',	width: 100 },
			heal_col	: {	src: 'assets/heal/heal_col.png',		width: 100 }
        },



		audio: {

			damage		: 'assets/damage/damage.wav',
			heal		: 'assets/heal/heal.wav',
			points		: 'assets/points/points.wav',
			revive		: 'assets/player/revive.wav',

            start		: 'assets/views/start/start.mp3',
            game		: 'assets/views/game/game.ogg'
		}
	},


	viewAssets: 'assets/views/',


	// magic numbers
	protocol: {

		POLLING			: 0,
		INIT			: 1,

		TEAMNAME		: 2,
		CANCEL			: 3,
		COUNTDOWN		: 4,
		JOINED			: 5,
		START			: 6,

		MOVE			: 7,
		HEAL			: 8,
		CREATE			: 9,
		COLLISION		: 10,
        END             : 11
	},


	// categories
	obstacles: {

		1: {
			type			: 'damage',
			size			: 100,
			velocity		: 1,
			value			:  10,
			frameDuration	: 100,
			collisionImg	: 'damage_col',
			collisionSound	: 'damage'
		},

		2: {
			type			: 'heal',
			size			: 100,
			velocity		: 1,
			value			:  10,
			frameDuration	: 100,
			collisionImg	: 'heal_col',
			collisionSound	: 'heal'
		},

		3: {
			type			: 'points',
			size			: 100,
			velocity		: 1,
			value			: 100,
			frameDuration	: 100,
			collisionImg	: 'points_col',
			collisionSound	: 'points'
		},

		4: {
			type			: 'points',
			size			: 100,
			velocity		: 1,
			value			: 50,
			frameDuration	: 100,
			collisionImg	: 'points_col',
			collisionSound	: 'points'
		}

	},


	player: {

		velocity: 2
	},


    playerColors: {

        1:  { r: 246,   g:  91,  b:  98 }, // red
        2:  { r:  83,   g: 102,  b: 243 }, // blue
        3:  { r: 162,   g: 251,  b:  91 }, // green
        4:  { r: 250,   g: 235,  b:  64 }, // yellow
        5:  { r: 223,   g: 105,  b: 254 }, // lila
        6:  { r: 255,   g: 182,  b: 106 }, // orange
        7:  { r: 144,   g: 216,  b: 255 }, // turq
        8:  { r: 255,   g: 121,  b: 198 }  // pink
    },

    backgroundColors: {

        1:  { r: 158,   g:   7,  b:  52 }, // red
        2:  { r:  10,   g:  26,  b: 161 }, // blue
        3:  { r:  81,   g: 154,  b:   6 }, // green
        4:  { r: 205,   g: 172,  b:  31 }, // yellow
        5:  { r: 105,   g:  23,  b: 140 }, // lila
        6:  { r: 235,   g: 124,  b:   0 }, // orange
        7:  { r:  23,   g: 163,  b: 158 }, // turq
        8:  { r: 177,   g:   0,  b: 101 }  // pink
    },

    colors: {

		1: 'red',
		2: 'blue',
		3: 'green',
		4: 'yellow',
		5: 'lila',
		6: 'orange',
		7: 'turkey',
		8: 'pink'
	}
};
