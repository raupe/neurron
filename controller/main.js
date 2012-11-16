(function(){

	// reference for display
	var channel = window.location.hash.substr(1);

		// showing element
		new controller.Screen({

			width: config.canvas.width,
			height: config.canvas.height
		});


		// delegating commands
		new controller.Manager({

			url: 'http://' + config.server + ':' + config.port,
			channel: channel
		});

		// handling input
		new controller.Input();


		new controller.Button('label','start');

})();

