(function(){

	// reference for display
	var channel = window.location.search.substr(1);

		// showing element
		new controller.Screen({

			width: config.canvas.width,
			height: config.canvas.height
		});

		// handling input
		new controller.Input();

		// delegating commands
		new controller.Manager({

			url: 'http://' + config.server + ':' + config.port,
			channel: channel
		});
})();

