(function(){

	var Screen = controller.Screen = function ( config ) {

		this.width = config.width;
		this.height = config.height;

		this.createCanvas();

		controller.Input.prototype.screen = this;
	};


	Screen.prototype.createCanvas = function(){

		var canvas = document.createElement('canvas');

		this.ctx = canvas.getContext('2d');
		this.cvs = canvas;

		this.scale();

		document.body.appendChild( this.cvs );

		window.addEventListener('resize', this.scale.bind( this ) );
		window.addEventListener('orientationchange', this.scale.bind( this ) );
	};

	Screen.prototype.scale = function() {

		this.cvs.width = window.innerWidth;
		this.cvs.height = window.innerHeight;
	};

})();
