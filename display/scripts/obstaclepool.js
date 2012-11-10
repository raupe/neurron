(function(){

	var ObstaclePool = display.ObstaclePool = function() {

		// collection pool
		this.pool = [];

		// active list
		this.list = [];

		display.Obstacle.prototype.pool = this;
	};


	ObstaclePool.prototype.get = function( id, category, start ) {

		var model = config.obstacles[category],
			entry;

		model.id = id;
		model.pos = start;

		if ( this.pool.length ) {

			entry = this.pool.pop();

			entry.init.call( entry, model );

		} else {

			entry = new display.Obstacle( model );
		}

		this.list[id] = entry;
	};


	ObstaclePool.prototype.set = function ( id ) { // transfer to pool

		this.pool.push( this.list[id] );
	};

})();
