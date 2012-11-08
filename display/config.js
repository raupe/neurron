var config = {

	namespace: 'display',

	server: 'neurron.com',
	port: '2020',

	// basic resolution
	canvas: {

		width: 320,
		height: 240
	},

	//
	assets: {

		images: {

			player: 'assets/alpha-test.png',
			test: 'assets/alpha-test.png',
			julia: 'assets/tux-test.png',
			fabian: 'assets/tux-test.png',
			duc: 'assets/tux-test.png',
			stefan: 'assets/tux-test.png'
		},

		sounds: {},
		movies: {}
	},


	elements: {

		size: 40
	},


	protocol: {

		1: 'channel',

		2: 'create',

		3: 'move'
	}
};




/* global namespace */
window[config.namespace] = {};
