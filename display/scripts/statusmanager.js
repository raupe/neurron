(function(){

	var StatusManager = display.StatusManager = function() {

		this.points = 0;
		this.createPanel( config.factor );
	};


	StatusManager.prototype.init = function ( playerList )  {

		this.playerList = playerList;

        this.fullBar = this.offset / 1.6;
        this.lifeBarStartX = this.offset / 8;
        this.colorBarStartX = this.lifeBarStartX / 2;
        this.lifeLabelStartX = this.lifeBarStartX + this.fullBar;
        this.startY = 140;
        this.color = 'green';

		this.updatePoints( 0 );
		this.updateLifeBars( 100 );
	};


	StatusManager.prototype.updatePoints = function ( value ) {

		var ctx = this.panel,
			size = 40;

		ctx.fillStyle = 'yellow';
		ctx.font = 'italic ' + size + 'pt Arial';
		ctx.fillText( value + ' points', this.offset/5, size * 2 );
	};

    // TODO set limits in config for red, orange/yellow, green
	StatusManager.prototype.updateLifeBars = function ( energy ) {

		var ctx = this.panel,
			playerList = this.playerList,
            currentPlayer,
            r,
            g,
            b;

		for ( var i = 0, l = playerList.length; i < l; i++ ){

            currentPlayer = playerList[i];
            currentPlayer.energy = 100;
            r = currentPlayer.color[0];
            g = currentPlayer.color[1];
            b = currentPlayer.color[2];

            if (currentPlayer.energy <= config.colorLimits.red) {

                this.color = 'red';

            } else if ( currentPlayer.energy <= config.colorLimits.orange ) {

                this.color = 'orange';

            } else {

                this.color = 'green';
            }

            // lifeBars
			ctx.fillStyle = this.color;
			ctx.fillRect( this.lifeBarStartX, this.startY + i*50, this.fullBar * (currentPlayer.energy / 100), 40);

            // lifeLabels
			ctx.fillStyle = 'white';
			ctx.font = 'italic ' + 20 + 'pt Arial';
			ctx.fillText( currentPlayer.energy + ' %', this.lifeLabelStartX, this.startY + 30 );

            // colorBar
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(this.colorBarStartX, this.startY + i*50, this.lifeBarStartX/2, 40);
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
