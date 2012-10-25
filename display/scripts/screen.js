(function(){

	var Screen = display.Screen = function ( config ) {

		this.width = config.width;
		this.height = config.height;

		this.elements = [];

		this.createCanvas();
		this.createGrid();

		this.render();
	};

	Screen.prototype.render = function(){

		var elements = this.elements,
			ctx = this.ctx;

		(function loop(){

			requestAnimationFrame( loop );

			ctx.clearRect( 0,0, ctx.canvas.width, ctx.canvas.height );

			elements.forEach(function ( element ) {

				element.draw();
			});

		})();
	};


	Screen.prototype.createGrid = function(){

		this.grid = new display.Grid({

			ctx: this.ctx,
			players: 10,
			distanceToUser: 350,
			circleOffset: 100,
			frames: 30,
			circles: 0
		});

		this.elements.push( this.grid );
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



})();
