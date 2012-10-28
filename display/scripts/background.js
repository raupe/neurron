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
		this.grid = config.grid;

		this.width = this.origin.canvas.width;
		this.height = this.origin.canvas.height;

		this.edges = config.edges;			// possible 3-10...40
		this.depth = config.depth;


		this.color = config.color;

		// frames
		this.frames = config.frames;

		// animation step
		this.step = 0;
		this.rate = 5;

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
		this.multiply = 360 / this.edges;	// pies

		// pre-define
		var points = [],

			sin = [],
			cos = [],

			i, l;

		for ( i = 0, l = this.depth * this.edges; i < l ; i++ ) {

			points[i] = { x: 0, y: 0, preX: 0, preY: 0 };
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

				left:	{ x: -50,	y:   0,		dir: 4 },

				right:	{ x:  50,	y:   0,		dir: 3 },

				top:	{ x:   0,	y: -50,		dir: 5 },

				bottom: { x:   0,	y:  50,		dir: 6 }
			},

			last = this.queue[this.queue.length-1];


		this.queue.push({

			x: last.x + options[dir].x,
			y: last.y + options[dir].y,
			dir: options[dir].dir
		});
	};



	Background.prototype.change = function(){

		// straight path
		if ( this.queue.length-1 === 0 ) {

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

			i, j, pos;


		for ( i = 0; i < circles; i++ ) {

			for ( j = 0; j < lanes; j++ ) {


				pos = i * lanes + j;

				points[ pos ].x =	~~(
										radius * cos[ ( multiply * j ) % 360 ] + // form

										raiseX * cos[ ( x - radius ) % 360 ] + // amplitude

										centerX // center - positioning
									);



				points[ pos ].y =	~~(
										radius * sin[ ( multiply * j ) % 360 ] + // form

										raiseY * sin[ ( y - radius ) % 360 ] + // amplitude

										centerY // center - positioning
									);

// part checks
// if ( diff.dir === 3 && points[ pos ].x < points[ pos ].preX ){ points[ pos ].x = points[ pos ].preX; }
// else  { points[ pos ].preX = points[ pos ].x; }

// if ( diff.dir === 4 && points[ pos ].x > points[ pos ].preX ){ points[ pos ].x = points[ pos ].preX; }
// else { points[ pos ].preX = points[ pos ].x; }

// if ( diff.dir === 5 && points[ pos ].y > points[ pos ].preY ){ points[ pos ].y = points[ pos ].preY; }
// else { points[ pos ].preY = points[ pos ].y; }

// if ( diff.dir === 6 && points[ pos ].y < points[ pos ].preY ){ points[ pos ].y = points[ pos ].preY; }
// else { points[ pos ].preY = points[ pos ].y; }

			}

			radius += offset;
		}


		// adjust grid position
		if ( this.queue.length-1 !== 0 ) {

			// this.grid.posX = points[ ~~points.length/2 ].x/2 - this.grid.width/4;
			// this.grid.posY = points[ ~~points.length/2 ].y/2 - this.grid.height/4;
		}
	};



	Background.prototype.draw = function(){

		var ctx = this.ctx,

			points = this.points,
			circles = this.depth,
			lanes = this.edges,

			offset = this.offset,
			multiply = this.multiply,

			color = this.color,
			step = this.step;


		// if ( step > this.rate ) {

		//	this.step = 0;
		// }


		for ( i = 0; i < circles - 1; i++ ) {

			for ( j = 0; j < lanes; j++ ) {

				// blue tones
				var r =	( color[0]  +	i * ( offset - 10 )	),
					g =	( color[1]  +	i * ( offset - 10 ) ),
					b =	( color[2]  +	i * ( offset - 10 ) );

				if ( r > 255 ) r = 255;
				if ( g > 255 ) g = 255;
				if ( b > 255 ) b = 255;


				ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';

				ctx.beginPath();


				if ( points[ (i+step) * lanes + j ] ) {

					ctx.moveTo(
								points[ (i+step) * lanes + j ].x,
								points[ (i+step) * lanes + j ].y
					);
				}


				if ( points[ (i+step) * lanes + (j+1) % lanes ] ){

					ctx.lineTo(
								points[ (i+step) * lanes + (j+1) % lanes ].x,
								points[ (i+step) * lanes + (j+1) % lanes ].y
					);
				}


				if ( points[ (i+1+step) * lanes + (j+1) % lanes ] ) {

					ctx.lineTo(
								points[ (i+1+step) * lanes + (j+1) % lanes ].x,
								points[ (i+1+step) * lanes + (j+1) % lanes ].y
					);

				}

				if ( points[ (i+1+step) * lanes + j ] ) {

					ctx.lineTo(
								points[ (i+1+step) * lanes + j ].x,
								points[ (i+1+step) * lanes + j ].y
					);
				}


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
