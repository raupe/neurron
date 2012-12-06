/* global namespace */
window.controller = {};

/* configuraitons */
var config = {

	server			: 'game.neurron.com',
	port			: '2020',

	boxes: {

		1			: [ 'button'  , 'Start a new Game' ],
		2			: [ 'label'   , 'The Game is already running' ],
		3			: [ 'label'   , 'Game not found' ]
	},

    pollingTimer    : 5,


	commands:	{

		REGISTER	: 1,
		MOVE		: 2,
		HEAL		: 3
	},


	protocolStoC: {

		START		: 1,
		STATUS		: 2
	},

    protocolCtoS: {

		START           : 1,
        DELETE          : 2,
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

		1: {      r: 255,  g:   0, b:   0},
        2: {   r: 255,  g: 255, b:   0},
        3: {    r: 255,  g:   0, b: 255},
        4: {    r:   0,  g: 255, b:   0},
        5: {    r:   0,  g: 255, b: 255},
        6: {    r:   0,  g:   0, b: 255},
        7: {    r:   0,  g:   0, b: 255},
        8: {    r: 128,  g:   0, b:   0},
        9: {    r: 128,  g: 128, b:   0},
        10: {   r: 128,  g:   0, b: 128},
        11: {   r:   0,  g: 128, b:   0},
        12: {   r:   0,  g: 128, b: 128},
        13: {   r:   0,  g:   0, b: 128},
        14: {r:   0,  g:   0, b: 128}
    }
};





















