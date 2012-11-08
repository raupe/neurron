(function(){

	var Controller = display.Controller = function() {

		this.players = {};		// player pool
		this.obstacles = {};	// obstacle pool
	};

	Controller.prototype.handle = function ( name, options ) {

		var commands = {

			"channel"		: this.channel,
			"create"		: this.create,
			"move"			: this.move,
			"remove"		: this.remove
		};

		commands[ name ].apply( this, options );
	};


	Controller.prototype.channel = function ( id ) {

		console.log( id );
	};

	// id, type, position
	Controller.prototype.create = function ( type, id, position ) {

		var element = {

				"player"	: display.Player,
				"obstacle"	: display.Obstacle
			},

			pools = {

				"player"	: this.players,
				"obstacle"	: this.obstacles
			};


		// create Element + register in pool
		pool[type][id] = new element[type]({

			"pos"			: 20,
			"id"			: options,
			"pool"			: pools[type],
			"size"			: config.elements.size
		});
	};

	Controller.prototype.move = function ( id, direction ) {

		// TODO options need to be seperated in index and direction
		var index = 0;

		var element = {

			"players"		: this.players,
			"obstacles"		: this.obstacles
		};

		element[type][index].move(direction);
	};


	Controller.prototype.remove = function ( type, id ) {

		var element = {

			"players"		: this.players,
			"obstacles"		: this.obstacles
		};

		delete element[type][id];
	};

})();
