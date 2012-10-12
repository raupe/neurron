(function(){
	
	var Action = display.Action = function(){
		
		
	};
	
	Action.prototype.handle = function( data ){
		
		var commands = {
			
			// those functions are not declared in this scope -> therefore "this" is a reference to prototype
			1: this.create,
			2: this.move,
			3: this.remove
		};
		
		commands[data[0]](data[1], data[2]); // data[0] can be eg.: 1 for create
		
	};
	
	Action.prototype.create = function ( type, options ){
		
		console.log("create" + options);
		
		var element = {
			
			1: display.Player,
			2: display.Obstacle
		};
		
		// create new Object
		new element[type]( options );
	};
	
	Action.prototype.move = function ( type, options ){
		
		// TODO
		var index = 0,
			direction = 1312;
		
		var element = {
			
			1: display.players,
			2: display.obstacles
		};
		
		element[type][index].move(direction);
	};
	
	Action.prototype.remove = function ( type, options){
		
		var element = {
			
			1: display.players,
			2: display.obstacles
		};
		
		element[type][options].remove();
	};
	
})();
