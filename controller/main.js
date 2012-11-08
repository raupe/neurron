(function(){

	// reference for display
	var channel = window.location.hash.substr(1),

		// showing element
		screen = new controller.Screen({

			width: config.canvas.width,
			height: config.canvas.height
		}),


		// delegating commands
		c = new controller.Controller({

			url: 'http://' + config.server + ':' + config.port,
			channel: channel
		}),


		// handling input
		input = new controller.Input({

			controller: c,
			screen: screen
		});

})();

