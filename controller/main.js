(function(){

	// reference for display
	var channel = window.location.search.substr(1);

		// showing element
		new controller.Screen();


		// handling input
		new controller.Input();

		// delegating commands
		new controller.Manager({

			url: 'http://' + config.server + ':' + config.port,
			channel: channel
		});
})();

