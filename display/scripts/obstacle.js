(function(){

	var Obstacle = display.Obstacle = function( config ){

		this.id = config.id;
		this.cvs = config.cvs;

		this.register();
	};

	Obstacle.prototype.register = function(){

		display.obstacles[this.id] = this; // add themselve to pool of obstacles

	};

	Obstacle.prototype.move = function( direction ){

		console.log(direction);
	};

	Obstacle.prototype.remove = function( direction ){

		delete display.obstacles[this.id];
	};

})();
