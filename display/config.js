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

			test: 'assets/tux-test.png',
			julia: 'assets/tux-test.png',
			fabian: 'assets/tux-test.png',
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
