(function(){


	var Screen = display.Screen = function ( config ) {

		this.width = config.width;
		this.height = config.height;

		this.createCanvas();
		this.createGrid();

		// this.render();
	};


	Screen.prototype.createGrid = function(){

		this.grid = new display.Grid({

			ctx: this.ctx,
			players: 4,
			distanceToUser: 350,
			circleOffset: 100,
			frames: 30,
			circles: 0
		});
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

		this.cvs.width = window.innerWidth - window.innerWidth/20;
		this.cvs.height = window.innerHeight - window.innerHeight/20;
	};



})();
