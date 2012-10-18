(function(){

	var Grid = display.Grid = function ( config ) {

		this.ctx = config.ctx;
		this.width = config.ctx.canvas.width;
		this.height = config.ctx.canvas.height;
		this.players = config.players;
		this.circles = config.circles;
		this.frames = config.frames;

		this.distanceToUser = config.distanceToUser;
		this.circleOffset = config.circleOffset;
		this.outerCircleRadius = this.height/2;

		this.definePositions();

		// this.draw();
	};


	Grid.prototype.definePositions = function(){

		// var ctx = this.ctx,

			/* constants */
		var distanceToUser = this.distanceToUser,
			circleOffset = this.circleOffset,
			outerCircleRadius = this.outerCircleRadius,
			frame = this.frames,

			/* pre-calculations */
			circles = this.circles + 3,
			lanes = this.players * 2,
			steps = lanes * frame,
			rotation = ( 2 * Math.PI ) / lanes,
			factor = 1/frame,

			centerX = this.width/2,
			centerY = this.height/2,

			/* declarations */
			fields = [],

			ringPos = [],
			distPos = [],

			// outer loop
			radiusA,
			x1, y1,

			// 3rd loop
			radiusB,
			x2, y2,

			// iterators
			circle,
			step,
			dist;

		//
		for ( circle = 0; circle < circles; circle++ ) {

			radiusA =	( distanceToUser * outerCircleRadius ) /
						( distanceToUser + circleOffset * circle);

			//
			for ( step = 0; step < steps; step++ ) {

				x1 = Math.cos( rotation * step ) * radiusA + centerX;
				y1 = Math.sin( rotation * step ) * radiusA + centerY;

				ringPos.push({ x: x1, y: y1 });

				if ( step%frame === 0 ) { // first time just one value ?

					for ( dist = 1; dist < frame; dist++ ) {

						radiusB =	( distanceToUser * outerCircleRadius ) /
									( distanceToUser + circleOffset * ( circle + factor * dist ) );

						x2 = Math.cos( rotation * step ) * radiusB + centerX;
						y2 = Math.sin( rotation * step ) * radiusB + centerY;

						distPos.push({ x:x2, y: y2 });

						// ctx.fillStyle ='red';
						// ctx.fillRect( x2 - 2.5, y2 -2.5, 5, 5 );
					}

					fields.push({

						dir: '',
						x: x1,
						y: y1,
						ring: ringPos.slice(),
						dist: distPos.slice()
					});

					distPos.length = ringPos.length = 0;

					// ctx.fillStyle ='blue';
					// ctx.fillRect( x1 - 2.5, y1 -2.5, 5, 5 );
				}
			}
		}

		// console.log(fields, fields.length);
		this.fields = fields;
	};



	Grid.prototype.draw = function(){

		this.drawCircles();

		this.drawGrid();
	};


	Grid.prototype.drawCircles = function(){

		var ctx = this.ctx,
			width = this.width,
			height = this.height,

			circles = this.circles + 3, // > 3 as basic player radius

			distanceToUser = this.distanceToUser,
			outerCircleRadius = this.outerCircleRadius,
			circleOffset = this.circleOffset;

		for ( i = 0; i < circles; i++ ) {

			radius = ( distanceToUser * outerCircleRadius ) / ( distanceToUser + circleOffset * i);

			// var h = ( a *f   ) / ( a + d * n );
			ctx.beginPath();

			ctx.arc( width/2, height/2, radius, 0, Math.PI * 2, true );

			ctx.closePath();
			ctx.stroke();
		}
	};


	Grid.prototype.drawGrid = function(){

		var ctx = this.ctx,

			lanes = this.players * 2,

			rotation = ( 2 * Math.PI ) / lanes,

			radius = ( this.distanceToUser * this.outerCircleRadius ) / this.distanceToUser,

			centerX = this.width/2,
			centerY = this.height/2,

			// loop declarations
			x, y, i;


		for ( i = 0; i < lanes; i++ ) {

			ctx.moveTo( centerX, centerY );

			x = Math.cos( rotation * i ) * radius + centerX;
			y = Math.sin( rotation * i ) * radius + centerY;

			ctx.lineTo( x, y);

			ctx.stroke();
		}
	};


})();
