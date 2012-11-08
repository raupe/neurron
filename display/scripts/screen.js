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

		var players = this.players,		// prototype || controller()
			obstacles = this.obstacles,	// prototype || controller()

			ctx = this.ctx;

		(function loop(){

			requestAnimationFrame( loop );

			ctx.clearRect( 0,0, ctx.canvas.width, ctx.canvas.height );


			players.forEach(function ( player ) {

				player.update();

				player.draw();
			});

			obstacles.forEach(function ( obstacle ) {

				obstacle.update();

				obstacle.draw();
			});

		})();
	};

})();
