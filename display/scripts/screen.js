(function(){

	var Screen = display.Screen = function() {

		this.createCanvas();

		// this.requestFullScreen();


		display.Element.prototype.screen = this;
		display.Background.prototype.screen = this;
		display.Manager.prototype.screen = this;
		display.StatusManager.prototype.screen = this;

		display.Grid.prototype.screen = this;
		display.Debug.prototype.screen = this;
	};


	Screen.prototype.createCanvas = function(){

		var canvas = document.createElement('canvas');

		this.ctx = canvas.getContext('2d');
		this.cvs = canvas;

		scale.apply( this );

		document.body.appendChild( this.cvs );

		window.addEventListener('resize', scale.bind(this) );
		window.addEventListener('orientationchange', scale.bind(this) );

		function scale(){

			this.cvs.width = window.innerWidth;
			this.cvs.height = window.innerHeight;
		}
	};


	// ToDo: cancel + fullscren change listener
	Screen.prototype.requestFullScreen = function(){

		var dd = document.documentElement;

		if ( !dd.requestFullScreen ) dd.requestFullScreen = dd.mozRequestFullScreen || dd.webkitRequestFullScreen || dd.webkitRequestFullscreen;
		if ( !document.cancelFullScreen) document.requestFullscreen = document.mozCancelFullScreen || document.webkitCancelFullScreen || document.webkitExitFullscreen;
		if ( !document.fullscreenEnabled ) document.fullscreenEnabled = document.mozFullscreenEnabled || document.webkitFullscreenEnabled || dd.webkitRequestFullScreen;

		this.cvs.addEventListener('click', function(){

			if ( document.fullscreenEnabled  ) {

				dd.requestFullScreen();
			}
		});
	};



	Screen.prototype.clear = function(){

		this.ctx.clearRect( 0,0, this.cvs.width, this.cvs.height );
	};

})();
