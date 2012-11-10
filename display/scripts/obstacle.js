(function(){

	var Obstacle = display.Obstacle = function ( config ) {

		this.init( config );
	};

    Obstacle.prototype = new display.Element();

    // extend Element init
    Obstacle.prototype.init = function ( config )  {

		var waypoints = ~~(config.pos/this.grid.lanes),

			lane = [];

		while ( waypoints-- ) {

			lane[waypoints] = config.pos%this.grid.lanes + waypoints * this.grid.lanes;
		}

		this.lane = lane;

		config.visible = true;

		this.type = config.type;

		display.Element.prototype.init.call(this, config);
    };


    // extend default update
    Obstacle.prototype.update = function(){

        if ( this.counter === 0 ) {

			if ( this.lane.length === 0 ) {

				this.visible = false;

				this.pool.set( this.id );

			} else {

				this.nextPos = this.lane.pop();

				this.dir = 'antiDist';
			}
        }

		display.Element.prototype.update.apply(this);
    };



})();
