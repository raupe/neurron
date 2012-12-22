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

		var div = document.createElement('div'),
			cvs = document.createElement('canvas');

		this.ctx = cvs.getContext('2d');
		this.cvs = cvs;

		cvs.id = 'screen';



		div.id = 'game-l';
		div.className = 'hide';

		div.appendChild( cvs );


		scale.apply( this );



		document.getElementById('container-left').appendChild( div );





		window.addEventListener('resize', scale.bind(this) );
		window.addEventListener('orientationchange', scale.bind(this) );

		function scale(){

//			this.cvs.width = window.innerWidth;
//			this.cvs.height = window.innerHeight;
            this.cvs.width = (window.innerWidth / config.factor) * (config.factor - 1); // (width / 4) * 3 | config.factor === 4
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
