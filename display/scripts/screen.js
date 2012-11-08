(function(){

	var Screen = display.Screen = function ( config ) {

		this.setup( config );

		this.createCanvas();

		this.render();
	};

	Screen.prototype.setup = function ( config ) {

		this.width = config.width;
		this.height = config.height;
		this.frames = config.frames;

		this.elements = [];
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



	Screen.prototype.render = function(){

		var elements = this.elements,
			ctx = this.ctx;

		(function loop(){

			requestAnimationFrame( loop );

			ctx.clearRect( 0,0, ctx.canvas.width, ctx.canvas.height );

			elements.forEach(function ( element ) {

				element.update();

				element.draw();
			});

		})();
	};

})();
