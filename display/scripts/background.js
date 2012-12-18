(function(){

	var Background = display.Background = function(){

		this.img = this.assetManager.get('image', 'background');

		display.Debug.prototype.background = this; // testing
		
		var width = this.screen.cvs.width,
			height = this.screen.cvs.height;
		
		this.minRadius = 5;
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

        //this.screen.ctx.drawImage( this.img, 0, 0,this.screen.cvs.width, this.screen.cvs.height );
        
        var circle, r, g, b, x=0, y=0, xTmp=0, yTmp=0,
        	ctx = this.ctx,
        	cx = this.cx,
        	cy = this.cy,
        	maxRadius = this.maxRadius,
        	minRadius = this.minRadius,
        	lineWidth = this.lineWidth;
        	outerCircleRadius = this.cvs.height / 2,
        	posShift = this.posShift;
        
        var rad = minRadius,
        	radDiff = 20,
        	tmp = 20;
        	
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
        	
        for(var rad = maxRadius; rad > minRadius; rad -= radDiff) {
        
        	circle = config.distanceToUser * (outerCircleRadius - rad) / (rad * config.circleOffset);
            radDiff = ~~(rad - minRadius) / (maxRadius - minRadius) *  40 + 2;
            
			r = getColor(circle, rad);
			g = getColor(circle+2, rad);
			b = getColor(circle+4, rad);
			
			x = this.grid.getTranslateX(rad);
			y = this.grid.getTranslateY(rad);
			
            ctx.beginPath(); 
			ctx.arc(cx+x, cy+y, rad, 0, Math.PI * 2, false); 
            ctx.fillStyle = "rgb(" + r + "," + g +"," + b + ")";
            ctx.fill();
    	}
    	
    	this.screen.ctx.drawImage(this.cvs, 0, 0, this.cvs.width, this.cvs.height);
    	
    	function getColor(circle, radius) {
    		
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
    		
    		return ~~color;
    	}
	};

})();
