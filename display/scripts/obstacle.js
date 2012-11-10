(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.type = config.type;

		this.visible = true;

		this.init( config );
	};

    Obstacle.prototype = new display.Element();

    Obstacle.prototype.update = function(){

		if ( !this.check ) {

			this.check = true;

			setTimeout( function(){

				this.visible = false;

				this.pool.set( this.id );

			}.bind(this), 1000);
		}

		//ObstaclePool.prototype.update.apply(this);
    };

})();
