(function(){

	var Options = display.Options = function ( params ) {

		this.grid = params.grid;
		this.background = params.background;
		this.manager = params.manager;

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

		var task = config.audio ? 'play' : 'pause',

			current = display.tracks.current,
			next = display.tracks.next;

		if ( next ) next[task]();

		if ( current ) {

			if ( config.audio && !current.volume ) display.sound( current );

			current[task]();
		}
	};


	Options.prototype.fullscreen = function(){

		if ( screenfull.enabled ) screenfull.toggle();
	};


	var btnFullScreen = document.getElementById('fullscreen');

	Options.prototype.changeFullScreen = function(){

		if ( !screenfull.isFullscreen ) btnFullScreen.classList.remove('off');

		this.grid.init();
		this.background.resize();

		this.manager.resize();
	};

})();
