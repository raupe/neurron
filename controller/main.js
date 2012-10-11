(function(){

	// reference for display
	var channel = window.location.hash.substr(1),

		// showing element
		screen = new controller.Screen({

			width: config.canvas.width,
			height: config.canvas.height
		}),


		// delegating commands
		action = new controller.Action({

			url: 'http://' + config.server + ':' + config.port,
			channel: channel
		}),


		// handling input
		input = new controller.Input({

			action: action,
			screen: screen
		});

})();

