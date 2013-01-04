(function(){

	var Background = display.Background = function(){

//		display.Debug.prototype.background = this; // testing

		this.minRadius = 20;

		this.ctx = this.screen.ctx,

		this.posShift = 0;
		this.rotate = 0.0001;
		this.rotateTime = 0;

		this.resize();
	};

	Background.prototype.resize = function() {

		var width = this.screen.cvs.width,
			height = this.screen.cvs.height;

		this.cx = width / 2;
		this.cy = height / 2;

		this.maxRadius = Math.sqrt(width*width + height*height) / 2;

	}

	Background.prototype.update = function(delta){

		this.posShift += delta / config.duration.moveTime;

		this.rotateTime -= delta;
		if(this.rotateTime < 0) {
			this.rotateTime = Math.random() * 15000 + 3000
			this.rotate = -this.rotate;
		}

//		console.log(delta);

        this.ctx.translate(this.cx, this.cy);
        this.ctx.rotate(this.rotate * delta);
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

        for(var rad = minRadius; rad < maxRadius; rad += radDiff) {

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
