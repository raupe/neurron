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
	
	// setTimeout(function(){
// 		
		// var data = [2, 1, 1020]; // command, type, options
// 			
		// action.handle( data );
	// }, 2000);
	
})();
