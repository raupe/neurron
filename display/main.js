(function(){

	var screen = new display.Screen({

			width: config.canvas.width,
			height: config.canvas.height
		}),

		action = new display.Action({

			screen: screen,
			obstacles: {}, // pool of obstacles
			players: {} // pool of players
		});

		connection = new display.Connection({

			action: action,
			server: config.server,
			port: config.port
		});


	/* delayed call for tests */

	// setTimeout(function(){
	//
	//	var data = ["move", "players", 0]; // command, type, options
	//
	//	action.handle( data );
	// }, 2000);

})();
