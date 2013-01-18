(function(){

	var Background = display.Background = function(){

		this.minRadius = 20;

		this.ctx = this.screen.ctx,

		this.posShift = 0;
		this.rotateDiff = 0.0001;
		this.rotateTime = 0;
		this.rotate = 0;

		this.resize();
	};

	Background.prototype.resize = function() {

		var width = this.screen.cvs.width,
			height = this.screen.cvs.height;

		this.cx = width / 2;
		this.cy = height / 2;

		this.maxRadius = Math.sqrt(width*width + height*height) / 2;
		
		this.lineEnds = [];
		this.lineStarts = [];
		this.lineNum = 128;
		var iStep = Math.PI * 2 / this.lineNum,
			i,
			sin,
			cos,
			sinMin,
			cosMin,
			cx = this.cx,
			cy = this.cy;
			
		for(i = Math.PI / 2; i > 0; i -= iStep) {
			sin = Math.sin(i);
			cos = Math.cos(i);
			sinMin = sin * this.minRadius;
			cosMin = cos * this.minRadius;
			sin *= this.maxRadius;
			cos *= this.maxRadius;
			this.lineEnds.push({x: sin+cx, y: -cos+cy});
			this.lineEnds.push({x: cos+cx, y: sin+cy});
			this.lineEnds.push({x: -sin+cx, y: cos+cy});
			this.lineEnds.push({x: -cos+cx, y: -sin+cy});
			
			this.lineStarts.push({x: sinMin+cx, y: -cosMin+cy});
			this.lineStarts.push({x: cosMin+cx, y: sinMin+cy});
			this.lineStarts.push({x: -sinMin+cx, y: cosMin+cy});
			this.lineStarts.push({x: -cosMin+cx, y: -sinMin+cy});
		}
	};

	Background.prototype.update = function(delta){

		this.posShift += delta / config.duration.moveTime;

		this.rotateTime -= delta;
		if(this.rotateTime < 0) {
			this.rotateTime = Math.random() * 15000 + 3000;
			this.rotateDiff = -this.rotateDiff;
		}
		this.rotate += this.rotateDiff * delta;

//		console.log(delta);
		
		this.ctx.translate(this.cx, this.cy);
		this.ctx.rotate(this.rotate);
		this.ctx.translate(-this.cx, -this.cy);
	};


	Background.prototype.draw = function(){

		var circle, r, g, b, x=0, y=0, xTmp=0, yTmp=0,
			ctx = this.ctx,
			cx = this.cx,
			cy = this.cy,
			maxRadius = this.maxRadius,
			minRadius = this.minRadius,
		lineWidth = this.lineWidth,
			outerCircleRadius = config.outerCircleRadius,
			posShift = this.posShift;

		var rad = minRadius,
			radDiff = 20,
			tmp = 20;

		x = this.grid.getTranslateX(0);
		y = this.grid.getTranslateY(0);

		var gradient = ctx.createRadialGradient(cx+x, cy+y, 1, cx, cy, maxRadius);
		gradient.addColorStop(0, 'rgb(90, 186, 255)');
		gradient.addColorStop((minRadius-1)/maxRadius, 'rgb(30, 62, 85)');

		for( rad = minRadius; rad < maxRadius; rad += radDiff ) {

			circle = config.distanceToUser * (outerCircleRadius - rad) / (rad * config.circleOffset);
			radDiff = ~~ ((rad - minRadius) / (maxRadius - minRadius) *  40 + 2);

			r = getColor(circle, rad, 17, 30);
			g = getColor(circle, rad, 29, 62);
			b = getColor(circle, rad, 72, 85);

			gradient.addColorStop(rad/maxRadius, 'rgb(' + r + ',' + g + ',' + b + ')');
		}

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc( cx, cy, maxRadius, 0, Math.PI * 2, false );
		ctx.fill();
		
		x = this.grid.getTranslateX(minRadius);
		y = this.grid.getTranslateY(minRadius);
		
		ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
		for(var i=0; i< this.lineNum; i++) {
			ctx.beginPath();
			ctx.moveTo(this.lineStarts[i].x+x, this.lineStarts[i].y+y);
			ctx.lineTo(this.lineEnds[i].x, this.lineEnds[i].y);
			ctx.stroke()
		}

		//ctx.fillRect( 0, 0, this.screen.cvs.width, this.screen.cvs.height);

		function getColor(circle, radius, col1, col2) {

			var tmp = (circle + posShift) % 2,
				color;


			if(tmp < 1) {
				color = (col2 - col1) * tmp + col1;
			} else {
				color = (col1 - col2) * (tmp - 1) + col2;
			}

			color = color * (maxRadius - radius) / (maxRadius - minRadius);

			return ~~color;
		}
	};

})();
