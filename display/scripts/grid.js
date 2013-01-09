(function(){

	var Grid = display.Grid = function() {

		display.Element.prototype.grid = this;

		display.Background.prototype.grid = this;
	};

	Grid.prototype.init = function ( params ) {

		this.params = params || this.params; // cache previous

		this.setup( this.params );

		this.definePositions();

		this.createCanvas();

		this.update();
	};


	Grid.prototype.setup = function ( params ) {

		this.origin = this.screen.ctx;

//		this.width = this.screen.cvs.width - this.screen.cvs.width / params.factor;
        this.width = this.screen.cvs.width;
		this.height = this.screen.cvs.height;

		this.frames = this.getFrames();

		this.players = params.players;
		this.circles = params.circles;
		this.lanes = params.lanes;

		this.distanceToUser = params.distanceToUser;
		this.circleOffset = params.circleOffset;
		this.outerCircleRadius = config.outerCircleRadius = this.height/2 - 100;
		this.maxRadius = Math.sqrt(this.width * this.width + this.height * this.height) / 2;

		// placement
		this.posX = 0;
		this.posY = 0;

		this.transX = 0;
		this.transY = 0;
		this.transXDest = 0;
		this.transYDest = 0;
	};

	Grid.prototype.getFrames = function(){

		return config.frames;
	};


	Grid.prototype.definePositions = function(){

		/* constants */
		var distanceToUser = this.distanceToUser,
			circleOffset = this.circleOffset,
			outerCircleRadius = this.outerCircleRadius,
			frame = this.frames,

			/* pre-calculations */
			circles = this.circles,
			lanes = this.lanes,
			steps = lanes * frame,
			rotation = ( 2 * Math.PI ) / steps,
			factor = 1/frame, // 1/30
			maxLength = circles * lanes,

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
			dist,

			temp,

			scale,
			scaleStep,

			angle;


		for ( circle = 0; circle < circles; circle++ ) {

			radiusA =	( distanceToUser * outerCircleRadius ) /
						( distanceToUser + circleOffset * circle);


			scale = distanceToUser / ( distanceToUser + circleOffset * circle );

			for ( step = 1; step <= steps; step++ ) {

				x1 = Math.cos( rotation * step ) * radiusA + centerX;
				y1 = Math.sin( rotation * step ) * radiusA + centerY;

				angle = rotation * step;



				if ( step%frame !== 0 ) {


					ringPos.push({ x: x1, y: y1, scale: scale, angle: angle, radius: radiusA });

				} else {

					for ( dist = 1; dist < frame; dist++ ) {

						radiusB =	( distanceToUser * outerCircleRadius ) /
									( distanceToUser + circleOffset * ( circle - factor * dist ) );

						scaleStep = distanceToUser / ( distanceToUser + circleOffset * ( circle - factor * dist ) ); // * BILDGRÖßE

						x2 = Math.cos( rotation * step ) * radiusB + centerX;
						y2 = Math.sin( rotation * step ) * radiusB + centerY;

						distPos.push({ x:x2, y: y2, scale: scaleStep, angle: angle, radius: radiusB });
					}




                    if ( fields.length ) {

                        temp = ( fields.length - 1 );


						fields[temp].antiRing = ringPos.slice();

						// ToDo: reverse animation fix - 39 -> 20 || where else reverse ?
						// if ( (temp+1) % lanes === 0 ) {

						//	fields[temp].antiRing.reverse();
						// }


						if ( temp && temp % lanes === 0 ) {

                            fields[temp-1].antiRing = fields[ temp - lanes ].ring.slice();
                        }
                    }

					fields.push({

						id: step * circle,
						x: x1,
						y: y1,
						ring: ringPos.slice().reverse(),
						dist: distPos.slice(),
						scale: scale,
						angle: angle,
						radius: radiusA
					});

					distPos.length = ringPos.length = 0;
				}
			}
		}


		// temporary fix for reverse edge case, excludes the last field
		for ( step = lanes-1; step < fields.length-1; step += lanes ) {

			fields[step].antiRing.reverse();
		}

		// last point
		fields[fields.length-1].antiRing = fields[fields.length - lanes ].ring.slice().reverse();
	//	fields[fields.length-1].antiDist = fields[fields.length - lanes - 1].dist.slice().reverse();


		this.fields = fields;
		this.lanes = lanes;
	};


	Grid.prototype.createCanvas = function(){

        var cvs = document.createElement('canvas'),
            ctx = cvs.getContext('2d');

        cvs.width = this.width;
        cvs.height = this.height;

        this.ctx = ctx;
	};


	Grid.prototype.update = function(delta){

		var diff = 0.0001 * delta;

		if(this.transX === this.transXDest) {
			this.transXDest = Math.random()/4 - 0.125;
		} else if (this.transX + diff < this.transXDest) {
			this.transX += diff;
		} else if (this.transX - diff > this.transXDest) {
			this.transX -= diff;
		} else {
			this.transX = this.transXDest;
		}

		if(this.transY === this.transYDest) {
			this.transYDest = Math.random()/4 - 0.125;
		} else if (this.transY + diff < this.transYDest) {
			this.transY += diff;
		} else if (this.transY - diff > this.transYDest) {
			this.transY -= diff;
		} else {
			this.transY = this.transYDest;
		}
	};


	Grid.prototype.draw = function(){

		this.drawCircles();

		this.origin.drawImage( this.ctx.canvas, this.posX, this.posY, this.width, this.height );
	};


	Grid.prototype.drawLines = function(){

		var fields = this.fields,
			ctx = this.ctx;

		fields.forEach(function ( field,counter ) {
			ctx.fillText( counter,field.x,field.y);
		});
	};


	Grid.prototype.drawCircles = function(){

		var ctx = this.ctx,
			width = this.width,
			height = this.height,

			circles = this.circles, // > 3 as basic player radius

			distanceToUser = this.distanceToUser,
			outerCircleRadius = this.outerCircleRadius,
			circleOffset = this.circleOffset;


			// check color influence
			// ctx.strokeStyle = 'white';


		for ( i = 0; i < circles; i++ ) {

			radius = ( distanceToUser * outerCircleRadius ) / ( distanceToUser + circleOffset * i);

			// var h = ( a *f   ) / ( a + d * n );
			//  var h = ( distanceToUser * BILDGRÖßE  ) / ( distanceToUser + circleOffset * n );
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

	Grid.prototype.getTranslateX = function(radius) {
		return this.transX * (this.maxRadius - radius);
	};

	Grid.prototype.getTranslateY = function(radius) {
		return this.transY * (this.maxRadius - radius);
	};

})();
