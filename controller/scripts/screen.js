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

		if ( colorId ) {

			var bvs = document.createElement('canvas'),
				btx = bvs.getContext('2d'),
				color = config.backgroundColors[ colorId ],

				width	= 10,
				opacity = 0.7,
				height	= width * 20,
				steps	= 60,
				value	= 255/steps,
				time	= 200;// 500;

			bvs.width = this.cvs.width;
			bvs.height = this.cvs.height;

			var	cx = bvs.width/2,
				cy = bvs.height/2,
				rad = ( Math.min( cx, cy )/10 ) * 9,
				grd = btx.createRadialGradient( cx, cy, rad - 4 * width, cx, cy, rad );

			grd.addColorStop( 0, '#000' );
			grd.addColorStop( 0.3, 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + opacity + ')' );
			grd.addColorStop( 0.6, 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + opacity + ')' );
			grd.addColorStop( 1, '#000');

			btx.fillStyle = grd;
			btx.fillRect( 0, 0, bvs.width, bvs.height );

			// center "line"
			btx.fillStyle = '#000';
			btx.fillRect( 0, cy - height/2, bvs.width, height);

			setTimeout( fade, time );

		} else {

			cvs.style['background'] = '#000';
		}


		function fade() {

			var img = btx.getImageData( 0, 0, bvs.width, bvs.height ),

				length = img.width * img.height,

				pixels = img.data;

			do { pixels[ (length << 2)+3 ] = value * steps;	} while ( length-- );

			btx.putImageData( img, 0, 0 );

			cvs.style['background'] = 'url(' + bvs.toDataURL('image/png') + ') no-repeat #000';

			if ( steps-- ) setTimeout( fade, time );
		}
	};


	Screen.prototype.clear = function(){

		var ctx = this.ctx;

		ctx.save();

		ctx.clearRect( 0 , 0 , ctx.canvas.width, ctx.canvas.height );

		ctx.restore();
	};

})();




