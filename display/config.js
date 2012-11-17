/* global namespace */
window.display = {

	views: {}
};

/* configurations */
window.config = {

	server			: '141.45.202.51',
	port			: '2020',


    factor			: 4,		// offset for statusbar and grid
    amountToHeal	: 10,		// how much a player can heal
    punishPoints	: 1000,


    circles			: 10,		// sync with server
    frames			: 30,


    duration: {

		moveTime	: 1200		// 1.2s, sync with server
    },


    // colors for lifeBars
    colorLimits: {

        red			: 20,
        orange		: 60
    },


	elements: {

		size: 40
	},

	assets: {

		image: {

			// collision : { // spritesheet

			//	src		: '',
			//	width	: '',
			//	height	: ''
			// },

			player		: 'assets/1.png',

			damage		: 'assets/2.png',
			heal		: 'assets/3.png',
			points		: 'assets/4.png',

			// collision	: 'assets/5.png',

			background	: 'assets/background.jpg'
		},

		audio: {

			collision	: 'assets/collision-test.wav'
		}
		// movies: {}
	},



	// magic numbers
	protocol: {

		POLLING		: 0,

		INIT		: 1,
		COUNTDOWN	: 2,
		START		: 3,
		MOVE		: 4,
		HEAL		: 5,
		CREATE		: 6,
		COLLISION	: 7
	},


	// categories
	obstacles: {

		// type defines the image key
		1: { type: 'damage'	, size: 1*40, velocity: 0.5, value:  10, color: [ 213,  10,  50 ],
				collisionImg: 'collision', collisionSound: 'collision' }, // red

		2: { type: 'heal'	, size: 1*40, velocity: 0.75, value:  10, color: [   0, 170,  30 ],
				collisionImg: 'collision', collisionSound: 'collision' }, // grean

		3: { type: 'points'	, size: 1*40, velocity: 1  , value: 100, color: [ 240, 220,  10 ],
				collisionImg: 'collision', collisionSound: 'collision' }, // yellow

		4: { type: 'points'	, size: 1*40, velocity: 1  , value:  50, color: [ 240, 220,  10 ],
				collisionImg: 'collision', collisionSound: 'collision' }
	}
};
