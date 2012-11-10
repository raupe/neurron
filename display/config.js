/* global namespace */
window.display = {};

/* configurations */
window.config = {

	server		: 'neurron.com',
	port		: '2020',

	// default resolution ? image scale ?
	// canvas: { width	: 320,	height	: 240 },

	elements: {

		size: 40
	},

	assets: {

		images: {

			player		: 'assets/alpha-test.png',

			damage		: 'assets/alpha-test.png',
			heal		: 'assets/alpha-test.png',
			points		: 'assets/alpha-test.png',

			collision	: 'assets/alpha-test.png',

			bg			: 'assets/tux-test.png'
		},

		sounds: {

			collision	: 'assets/collision-test.wav'
		}
		// movies: {}
	},



	// magic numbers
	protocol: {

		INIT		: 1,
		START		: 2,
		MOVE		: 3,
		HEAL		: 4,
		CREATE		: 5,
		COLLISION	: 6
	},


	// categories
	obstacles: {

		// type defines the image key
		1: { type: 'damage'	, size: 1*40, velocity: 0.5, value:  10, color: [ 213,  10,  50 ],
				collisionImg: 'collision', collisionSound: 'collision' }, // red

		2: { type: 'heal'	, size: 1*40, velocity: 1  , value:  10, color: [   0, 170,  30 ],
				collisionImg: 'collision', collisionSound: 'collision' }, // grean

		3: { type: 'points'	, size: 1*40, velocity: 1  , value: 100, color: [ 240, 220,  10 ],
				collisionImg: 'collision', collisionSound: 'collision' }, // yellow

		4: { type: 'points'	, size: 1*40, velocity: 1  , value:  50, color: [ 240, 220,  10 ],
				collisionImg: 'collision', collisionSound: 'collision' }
	}
};
