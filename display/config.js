/* global namespace */
window.display = {};

/* configurations */
window.config = {

	server		: 'neurron.com',
	port		: '2020',

	// default resolution ?
	canvas: {

		width	: 320,
		height	: 240
	},

	elements: {

		size: 40
	},

	assets: {

		images: {

			player	: 'assets/alpha-test.png',
			heal	: 'assets/alpha-test.png',
			bg		: 'assets/tux-test.png'
		}

		// sounds: {},
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

		1: { type: 'damage'	, size: 1*40, velocity: 1, value:  10, color: 'red'    },

		2: { type: 'heal'	, size: 1*40, velocity: 1, value:  10, color: [0,170,30]  },

		3: { type: 'points'	, size: 1*40, velocity: 1, value: 100, color: 'yellow' },

		4: { type: 'points'	, size: 1*40, velocity: 1, value:  50, color: 'yellow' }

	}
};
