/* global namespace */
window.controller = {};

/* configuraitons */
var config = {

	server			: 'neurron.com',
	port			: '2020',

	// basic resolution
	canvas: {

		width		: 320,
		height		: 240
	},

	buttons: {

		1			: ['label', 'The game has ended'],
		2			: ['label', 'The game is already running'],
		3			: ['label', 'Game not found']
	},



	commands:	{

		REGISTER	: 1,
		MOVE		: 2,
		HEAL		: 3
	},


	protocol: {

		START		: 1,
		STATUS		: 2
	}
};





















