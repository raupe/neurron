(function(){

	display.players = {}; // pool of players
	display.obstacles = {}; // pool of obstacles

	var screen = new display.Screen({

		width: config.canvas.width,
		height: config.canvas.height
	});

	var action = new display.Action({

		screen: screen
	});

	var connection = new display.Connection({

		action: action,
		server: config.server,
		port: config.port
	});

	// setTimeout(function(){
	//
	//	var data = ["move", "players", 0]; // command, type, options
	//
	//	action.handle( data );
	// }, 2000);

})();
