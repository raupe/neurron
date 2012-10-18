(function(){

	var Grid = display.Grid = function ( config ) {

		this.ctx = config.ctx;
		this.width = config.ctx.canvas.width;
		this.height = config.ctx.canvas.height;
		this.players = config.players;
		this.circles = config.circles;

		this.distanceToUser = config.distanceToUser;
		this.circleOffset = config.circleOffset;
		this.outerCircleRadius = this.height/2;

		this.definePositions();

		this.draw();
	};


	Grid.prototype.definePositions = function(){

		var ctx = this.ctx,

			distanceToUser = this.distanceToUser,
			circleOffset = this.circleOffset,
			outerCircleRadius = this.outerCircleRadius,

			circles = this.circles + 3,

			lanes = this.players * 2,

			rotation = ( 2 * Math.PI ) / lanes,

			centerX = this.width/2,
			centerY = this.height/2,

			pos = [], // elements
			radius,	x, y;


		for ( circle = 0; circle < circles; circle++ ) {

			radius = ( distanceToUser * outerCircleRadius ) / ( distanceToUser + circleOffset * circle);

			for ( lane = 0; lane < lanes; lane++ ) {

				x = Math.cos( rotation * lane ) * radius + centerX;
				y = Math.sin( rotation * lane ) * radius + centerY;

				pos.push({

					field: 1,
					x: x,
					y: y,

					left: [
							{ x:1,y:2 },
							{x:2, y:1 }
						]
					});

				ctx.fillStyle ='red';
				ctx.fillRect( x - 2.5,y -2.5, 5,5 );
			}
		}

		// console.log(pos);
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
