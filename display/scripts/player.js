(function(){
	
	var Player = display.Player = function( config ){
		
		this.id = config.id;
		this.cvs = config.cvs;
		
		this.register();
	};
	
	Player.prototype.register = function(){

		display.players[this.id] = this; // add themselve to pool of players 
		console.log(display.players);
	};
	
	Player.prototype.move = function( direction ){
		
		console.log(this.cvs);
	};
	
	Player.prototype.remove = function( direction ){
		
		delete display.players[this.id];
	};
	
})();
