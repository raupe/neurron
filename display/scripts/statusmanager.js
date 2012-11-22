(function(){

	var StatusManager = display.StatusManager = function() {

		this.points = 0;
		this.createPanel( config.factor );

        display.Debug.prototype.statusManager = this;
	};


	StatusManager.prototype.init = function ( playerList )  {

		this.playerList = playerList;

        this.fullBarWidth = this.offset / 1.6;
        this.fullBarHeight = 40;
        this.lifeBarStartX = this.offset / 8;
        this.colorBarStartX = this.lifeBarStartX / 2;
        this.lifeLabelStartX = this.lifeBarStartX + this.fullBarWidth;
        this.startY = 140;
        this.color = 'green';
        this.distance = this.fullBarHeight + 10;

        this.healer = 0;

		this.update();
	};

    StatusManager.prototype.update = function(){

        this.setBackground();
        this.showPoints();
        this.showLifeBars();
    };

	StatusManager.prototype.showPoints = function () {

		var ctx = this.panel,
			size = 40;

		ctx.fillStyle = 'yellow';
		ctx.font = 'italic ' + size + 'pt Arial';
		ctx.fillText( this.points + ' points', this.offset/5, size * 2 );
	};

	StatusManager.prototype.showLifeBars = function () {

		var ctx = this.panel,
			playerList = this.playerList,
            currentPlayer,
            r,
            g,
            b;

		for ( var i = 0, l = playerList.length; i < l; i++ ){

            currentPlayer = playerList[i];

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
			ctx.fillRect( this.lifeBarStartX, this.startY + i*this.distance, this.fullBarWidth * (currentPlayer.energy / 100), this.fullBarHeight);

            // lifeLabels
			ctx.fillStyle = 'white';
			ctx.font = 'italic ' + 20 + 'pt Arial';
			ctx.fillText( currentPlayer.energy + ' %', this.lifeLabelStartX, (this.startY + 30) + i*this.distance );

            // colorBar
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(this.colorBarStartX, this.startY + i*this.distance, this.lifeBarStartX/2, this.fullBarHeight);
		}

	};


	StatusManager.prototype.createPanel = function ( factor ) {

		var cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d');

		this.offset = (window.innerWidth / config.factor);

		cvs.width = this.offset;
		cvs.height = window.innerHeight;

		this.start = this.screen.cvs.width - this.offset;
		this.panel = ctx;
        this.canvas = cvs;
        this.setBackground();

        document.body.appendChild( this.canvas );
	};


    StatusManager.prototype.setBackground = function () {
        this.panel.fillStyle = '#000';
		this.panel.fillRect( 0, 0, this.panel.canvas.width, this.panel.canvas.height );
    };


	StatusManager.prototype.draw = function(){

//        this.screen.ctx.drawImage( this.panel.canvas, this.start, 0 );
//          document.body.appendChild( this.canvas );
	};


	StatusManager.prototype.handleHeal = function ( playerId, playersIds ) {

        var numberOfPlayers = playersIds.length,
            amountToHeal = config.amountToHeal,
            healForEachPlayer = ~~(amountToHeal / numberOfPlayers),
            currentPlayer,  i;

        this.healer = this.playerList[playerId - 1];

        if (this.healer.energy > amountToHeal) {

            this.healer.energy -= amountToHeal;

            for ( i = 0; i < numberOfPlayers; i++) {

                currentPlayer = this.playerList[playersIds[i] - 1];
                if (currentPlayer.energy <= 90) currentPlayer.energy += healForEachPlayer;
            }
        }

        this.update();
	};


	StatusManager.prototype.handleCollide = function ( obstacleId, playersIds ) {

        var currentObstacle = this.pool.list[obstacleId],
            type = currentObstacle.type,
            value = currentObstacle.value,
            numberOfPlayers = playersIds.length,
            currentPlayer,
            i;

        if ( type == 'damage' ) {

            for ( i = 0; i < numberOfPlayers; i++ ){
                currentPlayer = this.playerList[playersIds[i] - 1];
                if (currentPlayer.energy >= value) {
                    currentPlayer.energy -= value;
                } else {
                    currentPlayer.energy = 0;
                }
                if (currentPlayer.energy === 0) {
                    this.points -= config.punishPoints;
                }
            }

        } else if ( type == 'heal' ) {

            for ( i = 0; i < numberOfPlayers; i++ ){
                var healForEachPlayer = ~~(value / numberOfPlayers);
                currentPlayer = this.playerList[playersIds[i] - 1];
                if (currentPlayer.energy <= 90) currentPlayer.energy += healForEachPlayer;
            }

        } else { // points

            for ( i = 0; i < numberOfPlayers; i++ ){
                var pointsForEachPlayer = ~~(value / numberOfPlayers);
                currentPlayer = this.playerList[playersIds[i] - 1];

                this.points += (currentPlayer.energy / 100) * pointsForEachPlayer;
            }
        }

        this.update();
	};

     StatusManager.prototype.greet = function () {
         console.log("hello");
         this.playerList[0].energy = this.playerList[0].energy - 10;
         console.log(this.playerList[0].energy);

         this.update();
     }

})();
