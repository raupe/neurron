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

		this.draw();
	};


	Grid.prototype.definePositions = function(){

		/* constants */
		var distanceToUser = this.distanceToUser,
			circleOffset = this.circleOffset,
			outerCircleRadius = this.outerCircleRadius,
			frame = this.frames,

			/* pre-calculations */
			circles = this.circles + 3, // = 3
			lanes = this.players * 2, // 8
			steps = lanes * frame, // 240
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

			temp;

		//
		console.time(1);

		for ( circle = 0; circle < circles; circle++ ) { // 3

			radiusA =	( distanceToUser * outerCircleRadius ) /
						( distanceToUser + circleOffset * circle);

			//
			for ( step = 1; step <= steps; step++ ) { // 240

				x1 = Math.cos( rotation * step ) * radiusA + centerX;
				y1 = Math.sin( rotation * step ) * radiusA + centerY;

				ringPos.push({ x: x1, y: y1 });

				if ( step%frame === 0 ) { // mod 0 ..



					if ( fields.length < maxLength - lanes ) { // last circle check

						for ( dist = 1; dist < frame; dist++ ) {

							radiusB =	( distanceToUser * outerCircleRadius ) /
										( distanceToUser + circleOffset * ( circle + factor * dist ) );

							x2 = Math.cos( rotation * step ) * radiusB + centerX;
							y2 = Math.sin( rotation * step ) * radiusB + centerY;

							distPos.push({ x:x2, y: y2 });
						}

					} else {

						distPost = [];
					}




                    if ( fields.length ) {

                        temp = ( fields.length - 1 );

                        // console.log(ringPos[0].x);
                        fields[temp].antiRing = ringPos.slice().reverse();
                        // console.log(fields[temp].antiRing[ 29 ] );

                        if ( temp - lanes >= 0 ) {

							fields[temp].antiDist = fields[temp-lanes].dist.slice().reverse();

                        } else {

							fields[temp].antiDist = [];
                        }


						if ( temp && temp % lanes === 0 ) {

                            // fields[temp-1].antiRing = fields[ temp - lanes ].ring.slice().reverse();
                            // console.log(fields[ temp - lanes ].ring[1].x);
                            fields[temp-1].antiRing = fields[ temp - lanes ].ring.slice().reverse();

                        }
                    }



					fields.push({

						dir: '',
						x: x1,
						y: y1,
						ring: ringPos.slice(),
						dist: distPos.slice()
					});

					distPos.length = ringPos.length = 0;
				}
			}
		}

		// last point
		fields[fields.length-1].antiRing = fields[fields.length - lanes ].ring.slice().reverse();
		fields[fields.length-1].antiDist = fields[fields.length - lanes - 1].dist.slice().reverse();

		this.fields = fields;


	};



	Grid.prototype.draw = function(){

		this.drawCircles();

		this.drawGrid();


		var fields = this.fields;
		var ctx = this.ctx;

		fields.forEach(function ( field,counter ) {
			ctx.fillText( counter,field.x,field.y);
		});


        var a=10;


        // fields[a].ring.forEach(function ( field) {
        //     ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
        // });

        fields[a].antiRing.forEach(function ( field) {
            ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
        });

        // fields[a].dist.forEach(function ( field) {
        //     ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
        // });

        // fields[a].antiDist.forEach(function ( field) {
        //     ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
        // });
		// console.timeEnd(1);
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
