/* global namespace */
window.display = {};

/* configurations */
window.config = {

	server		: '141.45.200.85',
	port		: '2020',

    factor: 4, // offset for statusbar and grid

	// default resolution ? image scale ?
	// canvas: { width	: 320,	height	: 240 },

	elements: {

		size: 40
	},

	assets: {

		image: {

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
