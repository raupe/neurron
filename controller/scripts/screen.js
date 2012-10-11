(function(){

	var Screen = controller.Screen = function ( config ) {

		this.width = config.width;
		this.height = config.height;

		this.createCanvas();
	};


	Screen.prototype.createCanvas = function(){

		var canvas = document.createElement('canvas');

		this.ctx = canvas.getContext('2d');
		this.cvs = canvas;

		this.scale();

		document.body.appendChild( this.cvs );


		document.addEventListener('resize', this.scale.bind(this) );
		// document.addEventListener('deviceorientation', this.scale.bind(this) );
	};


	Screen.prototype.scale = function() {

		this.cvs.width = this.width;
		this.cvs.height = this.height;

	};


})();
