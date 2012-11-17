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

		this.collisionSound = params.collisionSound;

		// this.collisionImg = this.assetManager.get('image', config.collisionImg );
		// this.collisionSound = this.assetManager.get('audio', config.collisionSound);
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

			this.vanish();

		} else {

			// collide ?

			// else
			this.pos -= this.grid.lanes;
		}
    };


    Obstacle.prototype.vanish = function(){ // glitch: 3 -> 4

		this.visible = false;
		this.moving = false;

		this.pool.set( this.id );

		this.assetManager.get( 'audio', this.collisionSound ).play();
    };


    Obstacle.prototype.animateCollision = function(){

		// console.log(this.assetManager.get( 'audio', this.collisionSound.src ));
		// this.assetManager.get( 'audio', this.collisionSound ).play();

		// console.log('[collision] ', this.collisionImg.src);
		// console.log('audio', this.collisionSound );
	};

})();
