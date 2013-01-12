(function(){

	// reference for display
	var channel = window.location.search.substr(1);

	// delegating commands
	new controller.Manager({

		url		: 'http://' + config.server + ':' + config.port,
		channel	: channel
	});

})();

