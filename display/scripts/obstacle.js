(function(){

	var Obstacle = display.Obstacle = function ( params ) {

		this.init( params );
	};


    Obstacle.prototype = Object.create( display.Element.prototype );


    // extend Element init
    Obstacle.prototype.init = function ( params ) {

		this.endField = params.pos%this.grid.lanes;

		params.visible = true;

        this.value = params.value;
		this.type = params.type;

		this.velocity = params.velocity;


		display.Element.prototype.init.call( this, params );


		this.collisionCounter = 0;

		this.collisionSound = this.getAsset('audio', params.collisionSound );
		this.collisionImages = this.getAsset('image', params.collisionImg );

		this.move( this.endField );
    };


    Obstacle.prototype.setDir = function(){

		this.dir = 'dist';
    };


    Obstacle.prototype.change = function() {

		if ( this.pos < this.grid.lanes ) { // vanish too fast ?

			this.vanish();

		} else {

			this.pos -= this.grid.lanes;
		}
    };


    // extend animate for collision
    Obstacle.prototype.changeSprite = function(){

		if ( this.collisionCounter > 0 ) this.collide();

		display.Element.prototype.changeSprite.call( this );
    };


    Obstacle.prototype.collide = function(){

		if ( config.audio && this.collisionCounter === 0 && this.collisionSound ) {

			this.collisionSound.play();
		}

		if ( this.collisionCounter < this.collisionImages.length ) {

			this.src = this.collisionImages[ this.collisionCounter ];

			this.collisionCounter++;

		} else {

			this.collisionCounter = 0;

			this.vanish();
		}
    };


    Obstacle.prototype.vanish = function(){

		this.visible = false;
		this.moving = false;

		this.pool.set( this );
    };


})();
