(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.setup( config );

		this.register();
	};

    Obstacle.prototype = new display.Element();



})();
