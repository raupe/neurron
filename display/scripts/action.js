(function(){

	var Action = display.Action = function( config ){

		this.screen = config.screen;
	};

	Action.prototype.handle = function( data ){

		var commands = {

			// those functions are not declared in this scope -> therefore "this" is a reference to prototype
			"create": this.create,
			"move": this.move,
			"remove": this.remove
		};

		commands[data[0]].apply(this, [data[1], data[2]]); // execute in the context of this(Action), otherwise method think they are from commands
	};

	Action.prototype.create = function ( type, options ){

		var element = {

			"player": display.Player,
			"obstacle": display.Obstacle
		};

		// create new Object
		new element[type]({
			id: options,
			cvs: this.screen.cvs
		});
	};

	Action.prototype.move = function ( type, options ){

		// TODO options need to be seperated in index and direction
		var index = 0,
			direction = options;

		var element = {

			"players": display.players,
			"obstacles": display.obstacles
		};

		element[type][index].move(direction);
	};

	Action.prototype.remove = function ( type, options){

		var element = {

			"players": display.players,
			"obstacles": display.obstacles
		};

		element[type][options].remove();
	};

})();
