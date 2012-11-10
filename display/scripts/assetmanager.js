(function(){

	var AssetManager = display.AssetManager = function ( assets, main ) {

		this.images = assets.images;
		this.sounds = assets.sounds;

		this.main = main;

		this.init();
	};

	AssetManager.prototype.init = function(){

		var images = Object.keys(this.images),
			sounds = Object.keys(this.sounds);

		this.length = images.length + sounds.length;

		images.forEach( this.loadImage, this );
		sounds.forEach( this.loadSound, this );
	};

	AssetManager.prototype.loadImage = function ( key ) {

		var img = new Image(),
			url = this.images[ key ];

		img.onload = function(){

			this.images[key] = img;

			this.loaded( url );

		}.bind(this);

		img.src = url;
	};


	AssetManager.prototype.loadSound = function ( key ) {

		var audio = new Audio(),
			url = this.sounds[ key ];

		audio.preload = 'auto';
		audio.src = url;

		this.sounds[key] = audio;

		this.loaded( url );
	};


	AssetManager.prototype.loaded = function ( url ) {

		this.length--;

		if ( this.length !== 0 ){

			this.progress( url );

		} else {

			display.Element.prototype.assetManager = this;
			display.Background.prototype.assetManager = this;

			this.main();
		}
	};


	AssetManager.prototype.progress = function ( url ) {

		var perc = 100/this.length;

		console.log('[loaded] ' + url + '\t (' + perc + '%)' );
	};



})();
