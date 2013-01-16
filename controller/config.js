/* global namespace */
window.controller = {};

/* configurations */
var config = {

	server			: 'game.neurron.com',
	port			: '2020',

	pollingTimer    : 5,

	clearDelay		: 2000,
	clearRate		: 30,


	commands:	{

		REGISTER	: 1,
		NAME		: 2,
		MOVE		: 3,
		HEAL		: 4
	},


	protocolStoC: {

		START		: 1,
		STATUS		: 2
	},


	protocolCtoS: {

		REGISTER        : 1,
		TEAMNAME        : 2,

		CANCEL			: 3,

		RIGHT           : 4,
		LEFT            : 5,
		TOP             : 6,
		BOTTOM          : 7,
		CLOCKWISE       : 8,
		ANTICLOCKWISE   : 9,
		HEAL            : 10,
		POLLING         : 11
	},


	colors: {

		1: 'red',		// image - r: 148,	g:  24,	b:	55
		2: 'blue',		// image - r:  37,	g:  54,	b: 137
		3: 'green',		// image - r: 102,	g: 179,	b:	45
		4: 'yellow',	// image - r: 210,	g: 179,	b:	31
		5: 'lila',		// image - r: 105,	g:  41,	b: 134
		6: 'orange',	// image - r: 236,	g: 129,	b:	10
		7: 'turq',		// image - r:  46,	g: 155,	b: 215
		8: 'pink'		// image - r: 190,	g:  74,	b: 150
	},

    shadowColors: {

		red		: { r: 246,   g:  91,  b:  98 },
		blue	: { r:  83,   g: 102,  b: 243 },
		green	: { r: 162,   g: 251,  b:  91 },
		yellow	: { r: 250,   g: 235,  b:  64 },
		lila	: { r: 223,   g: 105,  b: 254 },
		orange	: { r: 255,   g: 182,  b: 106 },
		turq	: { r: 144,   g: 216,  b: 255 },
		pink	: { r: 255,   g: 121,  b: 198 }
    }
};
