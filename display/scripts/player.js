(function(){

	var Player = display.Player = function ( config ) {

		this.pool = config.pool;
		this.id = config.id;
		this.cvs = config.cvs;

		this.register();
	};

	Player.prototype.register = function(){

		this.pool[this.id] = this; // add themselve to pool of players
		console.log(this.pool);
	};

	Player.prototype.move = function ( direction ) {

		console.log(this.cvs);
	};

	Player.prototype.remove = function ( direction ) {

		delete this.pool[this.id];
	};

})();
