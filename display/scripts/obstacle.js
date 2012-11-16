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

        this.value = config.value;
		this.type = config.type;

		this.velocity = config.velocity;

		// this.collisionImg = this.assetManager.get('image', config.collisionImg );

		this.collisionSound = config.collisionSound;
		// this.collisionSound = this.assetManager.get('audio', config.collisionSound);

		display.Element.prototype.init.call(this, config);
    };


    // extend default update
    Obstacle.prototype.update = function(){

        if ( this.counter === 0 ) {

			if ( this.lane.length === 0 ) {

				this.animateCollision();

				this.visible = false;

				this.pool.set( this.id );

			} else {

				this.nextPos = this.lane.pop();

				this.dir = 'antiDist';
			}
        }

		display.Element.prototype.update.apply(this);
    };


    Obstacle.prototype.animateCollision = function(){

		// console.log(this.assetManager.get( 'audio', this.collisionSound.src ));
		this.assetManager.get( 'audio', this.collisionSound ).play();

		// console.log('[collision] ', this.collisionImg.src);
		// console.log('audio', this.collisionSound );
		// url -> ist der key !
		// this.assetManager.get( 'audio', this.collisionSound ).play();
    };


    // case 'timeupdate':

				// args.push( this.element.currentTime );


})();
