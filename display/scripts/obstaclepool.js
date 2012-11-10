(function(){

	var ObstaclePool = display.ObstaclePool = function(){

		this.list = [];
	};


	ObstaclePool.prototype.get = function( id, category, pos ) {

		var model = config.obstacles[category];

		model.id = id;
		model.pos = pos;

		// schauen ob visibles im pool ?
		this.list[id] = new display.Obstacle( model );
	};


})();



// pool - attribute, onscreen, visible , to obstacle,
