(function(){

	var Screen = display.Screen = function ( config ) {

		this.setup( config );

		this.createCanvas();

		this.createGrid();

		this.createBackground();

		this.elements.push( this.background );
		this.elements.push( this.grid );

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


	Screen.prototype.createGrid = function(){

		this.grid = new display.Grid({

			origin: this.ctx,
			players: 10,
			distanceToUser: 350,
			circleOffset: 100,
			frames: this.frames,
			circles: 0
		});
	};


	Screen.prototype.createBackground = function(){

		this.background = new display.Background({

			edges: 10,					// curve
			depth: 25,					// amount of circles

			frames: 2,
			color: [ 0, 30, 90 ],
			grid: this.grid,
			origin: this.ctx
		});
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
