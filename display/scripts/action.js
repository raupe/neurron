(function(){

	var Action = display.Action = function ( config ) {

		this.players = {}; // player pool
		this.obstacles = {}; // obstacle pool
		this.screen = config.screen;
	};

	Action.prototype.handle = function ( data ) {

		var commands = {

			/*	those functions are not declared in this scope
				-> therefore "this" is a reference to prototype */

			"create": this.create,
			"move": this.move,
			"remove": this.remove
		};

		/* execute in the context of this(Action), otherwise method think they are from commands */
		commands[data[0]].apply( this, [ data[1], data[2] ] );
	};

	Action.prototype.create = function ( type, options ) {

		var element = {

				"player": display.Player,
				"obstacle": display.Obstacle
			},

			pools = {

				"player": this.players,
				"obstacle": this.obstacles
			};

		// create new Object - player/obstacle
		new element[type]({

			pos: 20,
			id: options,
			screen: this.screen,
			pool: pools[type],
			size: config.elements.size
		});
	};

	Action.prototype.move = function ( type, options ) {

		// TODO options need to be seperated in index and direction
		var index = 0,
			direction = options;

		var element = {

			"players": this.players,
			"obstacles": this.obstacles
		};

		element[type][index].move(direction);
	};

	Action.prototype.remove = function ( type, options ) {

		var element = {

			"players": this.players,
			"obstacles": this.obstacles
		};

		element[type][options].remove();
	};

})();
