(function(){

	var Obstacle = display.Obstacle = function ( params ) {

		this.init( params );
	};

    Obstacle.prototype = new display.Element();


    // extend Element init
    Obstacle.prototype.init = function ( params ) {

		this.endField = params.pos%this.grid.lanes;

		params.visible = true;
		console.log(this.endField);
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


    // extend default update
    // Obstacle.prototype.animate = function() { // since allways update moving....


   //      var field = this.grid.fields[ this.pos ],

   //          step = field[this.dir][ ~~this.counter ]; // allow floats

   //      this.field = step;

   //      this.counter += this.velocity;


   //      if ( this.counter >= field[this.dir].length ) { // allow higher multiplicators

			// this.counter = 0;

			// if ( this.pos === this.endField ) {

			// 	// console.log(2);
			// 	this.vanish();

			// } else {

			// 	// this.pos -=

			// }

			// // console.log();


			// console.log(1);
        // }


		// display.Element.prototype.update.apply(this);
    // };

  //   Obstacle.prototype.setDir = function(){

		// this.dir = 'antiDist';
  //   };


    Obstacle.prototype.vanish = function(){


		this.assetManager.get( 'audio', this.collisionSound ).play();

		// this.visible = false;
		// this.pool.set( this.id );
    };


    Obstacle.prototype.animateCollision = function(){

		// console.log(this.assetManager.get( 'audio', this.collisionSound.src ));
		this.assetManager.get( 'audio', this.collisionSound ).play();

		// console.log('[collision] ', this.collisionImg.src);
		// console.log('audio', this.collisionSound );
		// url -> ist der key !
		// this.assetManager.get( 'audio', this.collisionSound ).play();
		//
		//

		// if length...

		// this.visible = false;
		// this.pool.set( this.id );
    };

})();
