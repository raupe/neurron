(function(){

	var Screen = controller.Screen = function() {

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

        if ( this.input ) this.input.setStyle();
	};


	Screen.prototype.setBackground = function ( colorId ) {

		var cvs = this.cvs;

		if ( !colorId ) { // before request

			cvs.style['background'] = '#000';

		} else { // after


		}

	};


	Screen.prototype.clear = function(){

		var ctx = this.ctx;

		ctx.save();

		ctx.clearRect( 0 , 0 , ctx.canvas.width, ctx.canvas.height );

		ctx.restore();
	};

})();




