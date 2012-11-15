(function(){

	var StatusManager = display.StatusManager = function() {

		this.points = 0;
		this.createPanel( config.factor );
	};


	StatusManager.prototype.init = function ( playerList )  {

		this.playerList = playerList;

		this.updatePoints( 0 );
		this.updateLifeBars( 100 );
	};


	StatusManager.prototype.updatePoints = function ( value ) {

		var ctx = this.panel,
			size = 40;

		ctx.fillStyle = 'red';
		ctx.font = 'italic ' + size + 'pt Arial';
		ctx.fillText( value + ' points', this.offset/5, size * 2 );
	};


	StatusManager.prototype.updateLifeBars = function ( energy ) {

		var ctx = this.panel,
			playerList = this.playerList;

		for ( var i = 0, l = playerList.length; i < l; i++ ){

			ctx.fillStyle = 'green';
			ctx.fillRect( 20, 200, 300, 40);

			ctx.fillStyle = 'white';
			ctx.font = 'italic ' + 20 + 'pt Arial';
			ctx.fillText( energy + ' %', this.offset/2.5, 230 );
		}

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

		this.panel = ctx;
	};


	StatusManager.prototype.draw = function(){

		this.screen.ctx.drawImage( this.panel.canvas, this.start, 0 );
	};


	StatusManager.prototype.handleHeal = function ( playerId, targets ) {

		console.log(playerId, targets);
	};


	StatusManager.prototype.handleCollision = function ( obstacleId, players ) {

		console.log(obstacleId, players);
	};




})();
