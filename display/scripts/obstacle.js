(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.type = 'fabian';

		this.setup( config );

		this.register();
	};

    Obstacle.prototype = new display.Element();



})();
