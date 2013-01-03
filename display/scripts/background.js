(function(){

	var Background = display.Background = function(){

		this.img = this.assetManager.get('image', 'background');

		display.Debug.prototype.background = this; // testing
		
		var width = this.screen.cvs.width,
			height = this.screen.cvs.height;
		
		this.minRadius = 20;
		this.maxRadius = Math.sqrt(width*width + height*height) / 2;
		
		this.cx = width / 2;
		this.cy = height / 2;
		
		this.cvs = document.createElement('canvas');
		this.ctx = this.cvs.getContext('2d');
		this.cvs.width = width;
		this.cvs.height = height;
		
		this.posShift = 0;
	};



	Background.prototype.update = function(delta){
		
		this.posShift += delta / config.duration.moveTime;
	};


	Background.prototype.draw = function(){

        var circle, r, g, b, x=0, y=0, xTmp=0, yTmp=0,
        	ctx = this.screen.ctx, //this.ctx,
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
		ctx.fillRect( 0, 0, this.screen.cvs.width, this.screen.cvs.height);
    	
    	//this.screen.ctx.drawImage(this.cvs, 0, 0, this.cvs.width, this.cvs.height);
    	
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
    		
    		
    		/*
    		var colMax = 110,
    			colDif = 40;
    		
    		var tmp = (circle  + posShift) % 6,
    			color;
    		
    		if(tmp < 2) {
    			color = colMax;
    		} else if ( tmp < 3) {
    			color = colMax - colDif * (tmp - 2);
    		} else if ( tmp < 5 ) {
    			color = colMax - colDif;
    		} else {
    			color = colMax - colDif * (6 - tmp);
    		}	
    		
    		color = color * (maxRadius - radius) / (maxRadius - minRadius);
    		
    		return ~~color;*/
    	}
	};

})();
