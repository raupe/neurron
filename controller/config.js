/* global namespace */
window.controller = {};

/* configuraitons */
var config = {

	server			: 'game.neurron.com',
	port			: '2020',

	boxes: {

		// 1			: [ 'button'  , 'Start a new game' ],
		2			: [ 'label'		, 'The game is already running !'					],
		3			: [ 'label'		, 'Game not found !'								],

		4			: [ 'button'	, 'Enter a teamname'				, 'requestLead' ],
		5			: [ 'button'	, 'Without a name'					, 'goCountdown'	],

		6			: [ 'label'		, 'How should your team be called ?'				],
		7			: [ 'form'		, ''								, 'goCountdown'	]
	},
	pollingTimer    : 5,


	commands:	{

		// TEAMNAME    : 1,
		REGISTER	: 1,
		MOVE		: 2,
		HEAL		: 3
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


    playerColors: {

        1:  { r: 246,   g:  91,  b:  98 }, // red
        2:  { r:  83,   g: 102,  b: 243 }, // blue
        3:  { r: 162,   g: 251,  b:  91 }, // green
        4:  { r: 250,   g: 235,  b:  64 }, // yellow
        5:  { r: 223,   g: 105,  b: 254 }, // lila
        6:  { r: 255,   g: 182,  b: 106 }, // orange
        7:  { r: 144,   g: 216,  b: 255 }, // turq
        8:  { r: 255,   g: 121,  b: 198 }  // pink
    },


    backgroundColors: {

        1:  { r: 158,   g:   7,  b:  52 }, // red
        2:  { r:  10,   g:  26,  b: 161 }, // blue
        3:  { r:  81,   g: 154,  b:   6 }, // green
        4:  { r: 205,   g: 172,  b:  31 }, // yellow
        5:  { r: 105,   g:  23,  b: 140 }, // lila
        6:  { r: 235,   g: 124,  b:   0 }, // orange
        7:  { r:  23,   g: 163,  b: 158 }, // turq
        8:  { r: 177,   g:   0,  b: 101 }  // pink
    }
};
