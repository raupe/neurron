/* global namespace */
window.display = {

	views: {}
};

/* configurations */
window.config = {

	server				: 'neurron.com',
	port				: '2020',


    factor				: 4,		// offset for statusbar and grid
    amountToHeal		: 10,		// how much a player can heal
    punishPoints		: 1000,



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

			player		: 'assets/player.png',

			damage		: 'assets/damage.png',
			heal		: 'assets/heal.png',
			points		: 'assets/points.png',

			background	: 'assets/background.jpg',


			collision: {

				src		: 'assets/explosion-sprite-sheet.png',
				width	: '64'
			}

		},

		audio: {

			collision	: 'assets/collision-test.wav'
		}
	},



	// magic numbers
	protocol: {

		POLLING			: 0,

		INIT			: 1,
		COUNTDOWN		: 2,
		START			: 3,
		MOVE			: 4,
		HEAL			: 5,
		CREATE			: 6,
		COLLISION		: 7
	},


	// categories
	obstacles: {

		1: {
			type			: 'damage',
			size			: 1*80,
			velocity		: 1,
			value			:  10,
			color			: [ 213,  10,  50 ], // red
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		},

		2: {
			type			: 'heal',
			size			: 1*40,
			velocity		: 0.75,
			value			:  10,
			color			: [   0, 170,  30 ], // green
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		},

		3: {
			type			: 'points',
			size			: 1*40,
			velocity		: 1,
			value			: 100,
			color			: [ 240, 220,  10 ], // yellow
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		},

		4: {
			type			: 'points',
			size			: 1*40,
			velocity		: 1,
			value			: 50,
			color			: [ 240, 220,  10 ],
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		}

	}
};
