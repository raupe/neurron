(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.type = config.type;

		this.visible = true;

		this.init( config );
	};

    Obstacle.prototype = new display.Element();



})();
