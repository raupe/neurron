(function(){

	var Screen = display.Screen = function() {

		this.createCanvas();


		display.Element.prototype.screen = this;
		display.Background.prototype.screen = this;
		display.Manager.prototype.screen = this;
		display.StatusManager.prototype.screen = this;

		display.Grid.prototype.screen = this;
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

	Screen.prototype.clear = function(){

		this.ctx.clearRect( 0,0, this.cvs.width, this.cvs.height );
	};

})();
