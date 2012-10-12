(function(){
	
	var Action = display.Action = function(){
		
		
	};
	
	Action.prototype.handle = function( data ){
		
		var commands = {
			
			// those functions are not declared in this scope -> therefore "this" is a reference to prototype
			1: this.create,
			2: this.move
		};
		
		commands[data[0]](data[1]); // data[0] can be eg.: 1 for create
		
	};
	
	Action.prototype.create = function ( options ){
		
		console.log("create" + options);
		
		var element = {
			
			1: display.Player,
			2: display.Obstacle
		};
		
		// create new Object
		new element[options]("geboren");
	};
	
	Action.prototype.move = function ( options ){
		
		console.log(options);
	};
	
	
})();
