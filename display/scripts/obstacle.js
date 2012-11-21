(function(){

	var Obstacle = display.Obstacle = function ( params ) {

		this.init( params );
	};

    Obstacle.prototype = new display.Element();


    // extend Element init
    Obstacle.prototype.init = function ( params ) {

		this.endField = params.pos%this.grid.lanes;

		params.visible = true;

        this.value = params.value;
		this.type = params.type;


		this.velocity = params.velocity;

		this.collisionSound = this.assetManager.get( 'audio', params.collisionSound );

		this.collisionImage = this.assetManager.get('image', params.collisionImg );

		this.collisionCounter = 0;

        // this.checkCollision = config.duration.moveTime / this.grid.frames;

		display.Element.prototype.init.call( this, params );

		this.move( this.endField );
    };


    Obstacle.prototype.setDir = function(){

		this.dir = 'antiDist';
    };


	// since allways update moving -> after fieldstep
    Obstacle.prototype.change = function() {

		if ( this.pos === this.endField ) {

			// 1.) glitch: 3 -> 4, next position ?
			// 2.) last step, half pixels ?

			this.vanish();

		} else {

			// collide logic....

			// else
			this.pos -= this.grid.lanes;
		}
    };


    Obstacle.prototype.vanish = function(){

		this.animateCollision();
    };


    Obstacle.prototype.animateCollision = function(){

		if ( this.collisionCounter === 0 ) this.collisionSound.play();

		if ( this.collisionCounter < this.collisionImage.length ) {

			this.src = this.collisionImage[ this.collisionCounter ];

			this.collisionCounter++;

		} else {

			this.collisionCounter = 0;

			this.visible = false;
			this.moving = false;

			this.pool.set( this.id );
		}
	};

})();
