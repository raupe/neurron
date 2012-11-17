(function(){

	var Scenemanager = display.Scenemanager = function ( scenes, callback ) {

		this.scenes = {};

		this.callback = callback;


		this.init();

		this.fetch( scenes );

		display.Debug.prototype.scene = this;
	};


	Scenemanager.prototype.init = function(){

		var wrapper = document.createElement('div');

		wrapper.id = 'wrapper';

		document.body.appendChild( wrapper );
	};


	Scenemanager.prototype.fetch =  function ( scenes ) {

		var keys = Object.keys( scenes );

		this.length = keys.length;

		keys.forEach(function ( title ) {

			this.request( title, scenes[title] );

		}.bind(this));
	};


	Scenemanager.prototype.request = function ( title, url ) {

		var req = new XMLHttpRequest();

		req.open( 'GET', url + '.html', true );

		req.onload = function ( t ) {

			this.parse( title, t.currentTarget.response );

		}.bind(this);

		req.send();
	};


	Scenemanager.prototype.parse = function ( title, response ) {

		var temp = document.createElement('div');

		temp.id = 'view-'+title;

		temp.innerHTML = response;

		this.scenes[title] = temp;

		if ( ! --this.length ) {

			this.callback({

				show		: this.show.bind(this),
				changeTo	: this.changeTo.bind(this)
			});
		}
	};

	Scenemanager.prototype.show = function ( key ) {

		wrapper.innerHTML = '';

		wrapper.appendChild( this.scenes[key]);

	};


	Scenemanager.prototype.changeTo = function ( key, callback ) {

		wrapper.appendChild( this.scenes[key]);

		callback();
	};








})();
