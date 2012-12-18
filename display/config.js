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


    errorURL            :  'http://neurron.com/notify/error.php',

    gameTime            : 2,		// Minutes


    factor				: 4,		// offset for statusbar and grid
    amountToHeal		: 10,		// how much a player can heal
    punishPoints		: 1000,
    deadTime            : 5,



	circleOffset		: 100,
	distanceToUser		: 150,

    circles				: 10,		// sync with server
    frames				: 30,


    duration: {

		moveTime		: 1200		// 1.2s, sync with server
    },


    // colors for lifeBars
    colorLimits: {

        red				: 20,
        orange			: 60
    },


	elements: {

		size			: 80
	},

	assets: {

		image: {

            // player
			player_1	: { src: 'assets/player/ron_blue_80.png', width: '80' }, // red
            player_2    : { src: 'assets/player/ron_blue_80.png', width: '80' }, // blue
            player_3    : { src: 'assets/player/ron_blue_80.png', width: '80' }, // green
            player_4    : { src: 'assets/player/ron_blue_80.png', width: '80' }, // yellow
            player_5    : { src: 'assets/player/ron_blue_80.png', width: '80' }, // lila
            player_6    : { src: 'assets/player/ron_blue_80.png', width: '80' }, // orange
            player_7    : { src: 'assets/player/ron_blue_80.png', width: '80' }, // turq
            player_8    : { src: 'assets/player/ron_blue_80.png', width: '80' }, // pink
            player_dead : { src: 'assets/player/ron_blue_80.png', width: '80' },


			// obstacle
			damage		: 'assets/damage/damage.png',
			heal		: 'assets/heal/heal.png',
			points		: 'assets/points/points.png',


			background	: 'assets/background.png',


			// animations
			collision   : {

				src		: 'assets/damage/explosion-sprite-sheet.png',
				width	: '64'
			},


            pink        : {

                src     : 'assets/heal/pink-test.png',
                width   : '57',
                height  : '55'
            },

            coin    : {

                src     : 'assets/points/coin-test.png',
                width   : '29',
                height  : '28'
            }
        },



		audio: {

			collision	: 'assets/damage/collision-test.wav',
            pink        : 'assets/heal/pink-test.wav',
            coin        : 'assets/points/coin-test.wav'
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
			size			: 1*60,
			velocity		: 1,
			value			:  10,
			color			: [ 213,  10,  50 ], // red
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		},

		2: {
			type			: 'heal',
			size			: 1*60,
			velocity		: 1,
			value			:  10,
			color			: [   0, 170,  30 ], // green
			collisionImg	: 'pink',
			collisionSound	: 'pink'
		},

		3: {
			type			: 'points',
			size			: 1*60,
			velocity		: 1,
			value			: 100,
			color			: [ 240, 220,  10 ], // yellow
			collisionImg	: 'coin',
			collisionSound	: 'coin'
		},

		4: {
			type			: 'points',
			size			: 1*60,
			velocity		: 1,
			value			: 50,
			color			: [ 240, 220,  10 ],
			collisionImg	: 'coin',
			collisionSound	: 'coin'
		}

	},


	player: {

		velocity: 3
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
    }
};
