(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.pool = config.pool;
		this.id = config.id;
		this.screen = config.screen;
		this.grid = config.screen.grid;

		this.register();
	};

    Obstacle.prototype = display.Element;

})();
