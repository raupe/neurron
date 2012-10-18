var config = {

	namespace: 'display',

	server: 'neurron.com',
	port: '2020',

	// basic resolution
	canvas: {

		width: 320,
		height: 240
	}
};

/* global namespace */
window[config.namespace] = {};
