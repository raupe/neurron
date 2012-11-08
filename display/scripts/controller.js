(function(){

	var Controller = display.Controller = function ( config ) {

		this.players = {}; // player pool
		this.obstacles = {}; // obstacle pool
		this.screen = config.screen;
	};

	Controller.prototype.handle = function ( name, options ) {

		var commands = {

			"channel"	: this.channel,
			"create"	: this.create,
			"move"		: this.move,
			"remove"	: this.remove
		};

		commands[ name ].apply( this, options );
	};


	Controller.prototype.channel = function ( id ) {

		console.log( id );
	};

	// id, type, position
	Controller.prototype.create = function ( id, type, position ) {

		var element = {

				"player"	: display.Player,
				"obstacle"	: display.Obstacle
			},

			pools = {

				"player"	: this.players,
				"obstacle"	: this.obstacles
			};

		// create new Object - player/obstacle
		new element[type]({

			"pos"	: 20,
			"id"	: options,
			"screen": this.screen,
			"pool"	: pools[type],
			"size"	: config.elements.size
		});
	};

	Controller.prototype.move = function ( id, direction ) {

		// TODO options need to be seperated in index and direction
		var index = 0;

		var element = {

			"players"	: this.players,
			"obstacles"	: this.obstacles
		};

		element[type][index].move(direction);
	};

	Controller.prototype.remove = function ( type, options ) {

		var element = {

			"players"	: this.players,
			"obstacles"	: this.obstacles
		};

		element[type][options].remove();
	};

})();
