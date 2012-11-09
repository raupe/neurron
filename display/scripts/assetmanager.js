(function(){

	var AssetManager = display.AssetManager = function ( assets, main ) {

		this.assets = assets;

		this.main = main;

		this.init();
	};

	AssetManager.prototype.init = function(){

		var assets = this.assets,
			category,
			keys;

		this.length = 0;


		// type
		Object.keys( assets ).forEach(function ( type ) {

			category = assets[type];

			keys = Object.keys( category );

			this.length += keys.length-1;

			// key
			keys.forEach( function ( key ) {

				this.load( type, key, category[key] );

			}, this);

		}, this);
	};


	AssetManager.prototype.load = function ( type, key, url ) {

		var container;

		if		( type === 'images' ) { container = new Image();	}
		else if ( type === 'sounds' ) { container = new Audio();	}
		else if ( type === 'movies' ) { container = new Video();	}

		container.onload = function(){

			this.assets[type][key] = container;

			if ( this.length !== 0 ){

				this.progress( url );

				this.length--;

			} else {

				display.Element.prototype.assetManager = this;
				display.Background.prototype.assetManager = this;

				this.main();
			}

		}.bind(this);

		container.src = url;
	};


	AssetManager.prototype.progress = function ( url ) {

		console.log('[loaded] ' + url + '\t (' + 100/this.length + '%)' );
	};



})();
