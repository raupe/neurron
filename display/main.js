(function(){
	
	display.players = {}; // pool of players
	display.obstacles = {}; // pool of obstacles
	
	var action = new display.Action({
		
	});
	
	var connection = new display.Connection({
		
		action: action,
		server: config.server,
		port: config.port 
	});
	
})();
