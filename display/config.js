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

			test: 'assets/alpha-test.png',
			julia: 'assets/tux-test.png',
			fabian: 'assets/alpha-test.png',
			duc: 'assets/tux-test.png',
			stefan: 'assets/tux-test.png'
		},

		sounds: {},
		movies: {}
	},


	elements: {

		size: 50
	}
};

/* global namespace */
window[config.namespace] = {};
