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

		this.collisionSound = this.assetManager.get( 'audio', params.collisionSound );

		this.collisionImages = this.assetManager.get( 'image', params.collisionImg );

		this.collisionCounter = 0;


		display.Element.prototype.init.call( this, params );

		this.move( this.endField );
    };


    Obstacle.prototype.setDir = function(){

		this.dir = 'dist';
    };


    Obstacle.prototype.change = function() {

		if ( this.pos < this.grid.lanes ) {

			this.vanish();

		} else {

			this.pos -= this.grid.lanes;
		}
    };


    // extend animate for collision
    Obstacle.prototype.animate = function(){

		if ( this.collisionCounter > 0 ) {

			this.collide();
		}

		display.Element.prototype.animate.call( this );
    };


    Obstacle.prototype.collide = function(){

		if ( this.collisionCounter === 0 && this.collisionSound ) this.collisionSound.play();

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

		this.pool.set( this.id );
    };




})();
