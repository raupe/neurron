(function(){
	
	var Player = display.Player = function( config ){
		
		console.log(config);
		this.register();
	};
	
	Player.prototype.register = function(){
		
		var length = Object.keys(display.players).length; // object has no length attribute, use keys method to add them to an array from which you can get the length
		
		display.players[length] = this; // add themselve to pool of players 
		
	};
	
})();
