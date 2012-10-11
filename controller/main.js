(function(){

	// reference for display
	var channel = window.location.hash.substr(1),


		// showing element
		screen = new controller.Screen({

			width: config.canvas.width,
			height: config.canvas.height
		}),

		// handling input
		input = new controller.Input({

			canvas: screen.cvs
		}),

		// delegating commands
		action = new controller.Action({

			url: 'http://neurron.dev/controller/',
			channel: channel
		});

})();

