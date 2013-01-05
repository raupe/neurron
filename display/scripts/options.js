(function(){

	var Options = display.Options = function ( params ) {

		this.grid = params.grid;
		this.background = params.background;

		this.init();
	};


	Options.prototype.init = function(){

		screenfull.onchange = this.changeFullScreen.bind(this);

		this.handleClick();
	};


	// trigger
	Options.prototype.handleClick = function(){

		document.getElementById('options').addEventListener('click', function ( e ) {

			var trg = e.target,	id = trg.id;

			if ( this[id] ) {

				trg.classList.toggle('off');

				this[id]();
			}

		}.bind(this));
	};


	Options.prototype.volume = function(){

		config.audio = !config.audio;

		// handle entries
		var task = config.audio ? 'play' : 'pause',

			tracks = display.tracks,

			keys = Object.keys(tracks),

			l = keys.length,

			i; // iterator

		for ( i = 0; i < l; i++ ) {

			if ( tracks[ keys[i] ] ) tracks[ keys[i] ][task]();
		}
	};


	Options.prototype.fullscreen = function(){

		if ( screenfull.enabled ) {

			screenfull.toggle();
		}
	};


	Options.prototype.changeFullScreen = function(){

		this.grid.init();
		this.background.resize();
	};

})();
