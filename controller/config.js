/* global namespace */
window.controller = {};

/* configuraitons */
var config = {

	server			: 'game.neurron.com',
	port			: '2020',

	boxes: {

		// enter name
		// without name
		// 1			: [ 'button'  , 'Start a new game' ],
		2			: [ 'label'		, 'The game is already running !'					],
		3			: [ 'label'		, 'Game not found !'								],

		4			: [ 'button'	, 'Enter a teamname'				, 'askTeamname'	],
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
		RIGHT           : 3,
		LEFT            : 4,
		TOP             : 5,
		BOTTOM          : 6,
		CLOCKWISE       : 7,
		ANTICLOCKWISE   : 8,
		HEAL            : 9,
		POLLING         : 10
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
    }
};





















