(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.pool = config.pool;
		this.id = config.id;
		this.screen = config.screen;
		this.ctx = this.screen.ctx;
		this.grid = config.screen.grid;

		this.size = config.size;
		this.pos = config.pos;

		this.register();
	};

    Obstacle.prototype = new display.Element();



})();
