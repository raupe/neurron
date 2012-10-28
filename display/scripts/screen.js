(function(){

	var Screen = display.Screen = function ( config ) {

		this.setup( config );

		this.createCanvas();

		this.createBackground();

		this.createGrid();

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

		this.scale();

		document.body.appendChild( this.cvs );

		window.addEventListener('resize', this.scale.bind(this) );
		window.addEventListener('orientationchange', this.scale.bind(this) );
	};


	Screen.prototype.scale = function() {

		this.cvs.width = window.innerWidth;
		this.cvs.height = window.innerHeight;
	};


	Screen.prototype.createBackground = function(){

		this.background = new display.Background({

			edges: 40,					// curve
			depth: 25,					// amount of circles

			frames: 2,
			origin: this.ctx
		});

		this.elements.push( this.background );
	};


	Screen.prototype.createGrid = function(){

		this.grid = new display.Grid({

			origin: this.ctx,
			players: 10,
			distanceToUser: 350,
			circleOffset: 100,
			frames: this.frames,
			circles: 0
		});

		this.elements.push( this.grid );
	};


	Screen.prototype.render = function(){

		var elements = this.elements,
			ctx = this.ctx;

		(function loop(){

			requestAnimationFrame( loop );

			ctx.clearRect( 0,0, ctx.canvas.width, ctx.canvas.height );

			elements.forEach(function ( element ) {

				element.update(); // former ".draw()"
			});

		})();
	};

})();
