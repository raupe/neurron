(function(){

	var StatusManager = display.StatusManager = function() {

		this.points = 0;

		this.createPanel();
	};


	StatusManager.prototype.createPanel = function(){

		var cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d');

		this.offset = this.screen.cvs.width/5;

		cvs.width = this.offset;

		ctx.fillStyle = '#000';

		this.start = this.screen.cvs.width - this.offset;
		this.height = this.screen.cvs.height;

		ctx.fillRect( this.start, 0, this.offset, this.height );

		this.panel = cvs;
	};


	StatusManager.prototype.draw = function(){

		this.screen.ctx.drawImage( this.panel, this.start, 0 );
	};


	StatusManager.prototype.handleHeal = function ( playerId, targets ) {

		console.log(playerId, targets);
	};


	StatusManager.prototype.handleCollision = function ( obstacleId, players ) {

		console.log(obstacleId, players);
	};




})();
