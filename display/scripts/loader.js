(function(){

	var Loader = display.Loader = function ( assets, main ) {

		this.images = assets.images;
		this.sounds = assets.images;
		this.movies = assets.movies;

		// this.assets = assets;

		this.main = main;

		this.load();
	};

	Loader.prototype.load = function(){


		// var assets = this.assets;

		// Object( assets ).forEach(function( type ){

		// }, this);
		//

		var images = Object.keys( this.images );
		this.images.length = images.length-1;


		images.forEach( function ( key ) {

			this.loadImage( key, this.images[key] );

		}, this );



	};

	Loader.prototype.loadImage = function ( key, url ) {

		var img = new Image();

		img.onload = function() {

			this.images[key] = img;

			if ( this.images.length === 0 ) {

				this.main( this );

			} else {

				this.progress();

				this.images.length--;
			}

		}.bind(this);

		img.src = url;
	};

	Loader.prototype.progress = function(){

		// console.log( 100/this.images.length + '% loaded');
	};



})();
