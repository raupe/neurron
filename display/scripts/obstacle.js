(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.pool = config.pool;
		this.id = config.id;
		this.cvs = config.cvs;

		this.register();
	};

	Obstacle.prototype.register = function(){

		this.pool[this.id] = this; // add themselve to pool of obstacles
	};

	Obstacle.prototype.move = function ( direction ) {

		console.log(direction);
	};

	Obstacle.prototype.remove = function ( direction ) {

		delete this.pool[this.id];
	};

})();
