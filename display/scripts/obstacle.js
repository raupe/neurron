(function(){
	
	var Obstacle = display.Obstacle = function( config ){
		
		this.register();
	};
	
	Obstacle.prototype.register = function(){
		
		var length = Object.keys(display.obstacles).length; // object has no length attribute, use keys method to add them to an array from which you can get the length
		
		display.obstacles[length] = this; // add themselve to pool of obstacles 
		
	};
	
})();
