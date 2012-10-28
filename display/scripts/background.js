/* based on: http://txd.kung-fu.lt/tunnel/tunnel.html */
(function(){

	var Background = display.Background = function ( config ) {

        this.setup( config );

		this.defineConstants();

		this.createCanvas();

		this.update();
	};


	Background.prototype.setup = function ( config ) {

		this.origin = config.origin;

		this.width = this.origin.canvas.width;
		this.height = this.origin.canvas.height;

		this.edges = config.edges;			// possible 3-10...40
		this.depth = config.depth;


		// frames
		this.frames = config.frames;

		// animation step
		this.step = 0;

		// sequence list
		this.queue = [{ x: 0, y: 0 }];
	};


	Background.prototype.defineConstants = function(){

		// basis: 0 - 360
		this.x = 0;
		this.y = 0;

		// velocity
		this.vX = this.frames;						// default: -14
		this.vY = this.frames;						// default: 12

		// center
		this.centerX = this.width/2;
		this.centerY = this.height/2;


		this.offset = 20;					// tile size - distance/radius
		this.multiply = 360 / this.edges;	// parts

		// pre-define
		var points = [],

			sin = [],
			cos = [],

			i, l;

		for ( i = 0, l = this.depth * this.edges; i < l ; i++ ) {

			points[i] = { x: 0, y: 0 };
		}

		this.points = points;


		for ( i = 0; i < 360; i++ ) {

			sin[i] =  Math.sin( i * Math.PI / 180 );
			cos[i] =  Math.cos( i * Math.PI / 180 );
		}

		this.sin = sin;
		this.cos = cos;
	};



	Background.prototype.createCanvas = function(){

        var cvs = document.createElement('canvas'),
            ctx = cvs.getContext('2d');

        cvs.width = this.width;
        cvs.height = this.height;

        this.ctx = ctx;
	};



	Background.prototype.update = function(){

		// this.change();

		// this.draw();
	};



	Background.prototype.sequence = function ( dir ) {

		var options = { // need data for sub-frames

				left:	{ x: -50,	y:   0 },

				right:	{ x:  50,	y:   0 },

				top:	{ x:   0,	y: -50 },

				bottom: { x:   0,	y:  50 }
			},

			last = this.queue[this.queue.length-1];


		this.queue.push({

			x: last.x + options[dir].x,
			y: last.y + options[dir].y
		});
	};



	Background.prototype.change = function(){

		// straight path
		if ( !this.queue.length ) {

			this.diff = { x: 0, y: 0 };

		} else {

			this.diff = this.queue[this.queue.length-1]; // pop...

			// - moving the position of the grid canvas as well - keeping center
			// - define transitions between parts
			// - moving forward, changing colorCycle
			// - limit parts (left, right, top, bottom)
		}

		var diff = this.diff,

			points = this.points,
			cos = this.cos,
			sin = this.sin,

			multiply = this.multiply,	// multiply, spin looking factor - default: 5
			circles = this.depth,
			lanes = this.edges,

			offset = this.offset,		// radius increment
			centerX = this.centerX,
			centerY = this.centerY,

			raiseX = diff.x,			// x-coordinate, width amplitude - default: 60
			raiseY = diff.y,			// y-coordinate, height amplitude - default: 45

			x = this.x + 3600,			// position - additonal value >= 1000, ? - default: 3600
			y = this.y + 3600,

			radius = 0,

			i, j;


		for ( i = 0; i < circles; i++ ) {

			for ( j = 0; j < lanes; j++ ) {


				points[ i * lanes + j ].x = ~~(
												radius * cos[ ( multiply * j ) % 360 ] + // form

												raiseX * cos[ ( x - radius ) % 360 ] + // amplitude

												centerX // center - positioning
											);

				points[ i * lanes + j ].y = ~~(
												radius * sin[ ( multiply * j ) % 360 ] + // form

												raiseY * sin[ ( y - radius ) % 360 ] + // amplitude

												centerY // center - positioning
											);
			}

			radius += offset;
		}

	};


	Background.prototype.draw = function(){

		var ctx = this.ctx,

			points = this.points,
			circles = this.depth,
			lanes = this.edges,

			offset = this.offset,
			multiply = this.multiply;


		for ( i = 0; i < circles - 1; i++ ) {

			for ( j = 0; j < lanes; j++ ) {

				// forward
				// if ( !this.queue.length ) {

					// if ( this.forward >= this.depth  ) {

						// this.forward = 0;

					// } else {

						// this.forward++;
					// }
				// }

				// blue tones
				var r =  0,
					g =			i * ( offset - 10 ),//+ ~~( Math.sin( ( j * multiply / 2 ) * Math.PI / 180 )  * 255 * i / circles ),
					b = 90 +	i * ( offset - 10 );


				ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';

				ctx.beginPath();

				ctx.moveTo(
							points[ i * lanes + j ].x,
							points[ i * lanes + j ].y
				);


				ctx.lineTo(
							points[ i * lanes + (j+1) % lanes ].x,
							points[ i * lanes + (j+1) % lanes ].y
				);


				ctx.lineTo(
							points[ (i+1) * lanes + (j+1) % lanes ].x,
							points[ (i+1) * lanes + (j+1) % lanes ].y
				);

				ctx.lineTo(
							points[ (i+1) * lanes + j ].x,
							points[ (i+1) * lanes + j ].y
				);

				// draw in texture map
				ctx.fill();
			}
		}

		// update position
		this.x = ( this.x + this.vX ) % 360;
		this.y = ( this.y + this.vY ) % 360;


		// positiong afterwards...
		this.origin.drawImage(
								ctx.canvas,
								-this.width/2,
								-this.height/2,
								this.width*2,
								this.height*2
							);
	};

})();
