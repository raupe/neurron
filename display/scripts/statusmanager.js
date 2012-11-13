(function(){

	var StatusManager = display.StatusManager = function() {

		this.points = 0;
		this.createPanel( 4 );
	};


	StatusManager.prototype.init = function ( playerlist )  {

	};


	StatusManager.prototype.createPanel = function ( factor ) {

		var cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d');

			this.offset = this.screen.cvs.width / factor;

		cvs.width = this.offset;
		cvs.height = this.screen.cvs.height;

		this.start = this.screen.cvs.width - this.offset;


		ctx.fillStyle = '#000';

		ctx.fillRect( 0, 0, cvs.width, cvs.height );

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
