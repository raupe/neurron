/* global namespace */
window.display = {

	views: {},
    logic: {},
    load_view: {}
};

/* configurations */
window.config = {


	server				: '141.45.201.22',//'game.neurron.com',
	port				: '2020',


    errorURL            :  'http://neurron.com/notify/error.php',

    // countdown           : 15,
    gameTime            : 2,


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

		size			: 40
	},

	assets: {

		image: {


			// player
			player_1	: 'assets/player/player_1.png',
			player_2	: 'assets/player/player_2.png',
			player_3	: 'assets/player/player_3.png',
			player_4	: 'assets/player/player_4.png',
			player_5	: 'assets/player/player_5.png',
			player_6	: 'assets/player/player_6.png',
			player_7	: 'assets/player/player_7.png',
			player_8	: 'assets/player/player_8.png',

			player_dead	: 'assets/player/player_dead.png',



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
        1: {r: 255,  g:   0, b:   0},
        2: {r: 255,  g: 255, b:   0},
        3: {r: 255,  g:   0, b: 255},
        4: {r:   0,  g: 255, b:   0},
        5: {r:   0,  g: 255, b: 255},
        6: {r:   0,  g:   0, b: 255},
        7: {r:   0,  g:   0, b: 255},
        8: {r: 128,  g:   0, b:   0},
        9: {r: 128,  g: 128, b:   0},
        10: {r: 128,  g:   0, b: 128},
        11: {r:   0,  g: 128, b:   0},
        12: {r:   0,  g: 128, b: 128},
        13: {r:   0,  g:   0, b: 128},
        14: {r:   0,  g:   0, b: 128}
    }
};
