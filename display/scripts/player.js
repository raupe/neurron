(function(){
	
	var Player = display.Player = function( config ){
		
		this.id = config.id;
		console.log(config);
		this.register();
	};
	
	Player.prototype.register = function(){

		display.players[this.id] = this; // add themselve to pool of players 
		
	};
	
	Player.prototype.move = function( direction ){
		
		console.log(direction);
	};
	
	Player.prototype.remove = function( direction ){
		
		delete display.players[this.id];
	};
	
})();
