(function(){

	var StatusManager = display.StatusManager = function() {

		this.points = 0;
		this.createPanel( config.factor );

        display.Debug.prototype.statusManager = this;
	};


	StatusManager.prototype.init = function ( playerList )  {

        this.points = 0;
		this.playerList = playerList;

        this.fullBarWidth = this.offset / 1.6;
        this.fullBarHeight = 40;
        this.energyBarStartX = this.offset / 8;
        this.colorBarStartX = this.energyBarStartX / 2;
        this.lifeLabelStartX = this.energyBarStartX + this.fullBarWidth + 4; // 4 offset that it doesnt catch the energybar
        this.startY = 140;
        this.color = 'green';
        this.distance = this.fullBarHeight + 10;

        this.healer = 0;
		this.draw();
	};

    StatusManager.prototype.draw = function(){

        this.setBackground();
        this.showPoints();
        this.showLifeBars();
    };

	StatusManager.prototype.showPoints = function () {

		var ctx = this.panel,
			size = 40;

		ctx.fillStyle = 'yellow';
		ctx.font = '' + size + 'pt Comic Sans MS'; // 'italic ' + size + 'pt Comic Sans MS';

        // firefly symbol instead 'points' or $ ?
        ctx.fillText( ( display.teamname || 'Total' ) + ': ' + this.points + ' $', this.offset/6, size * 2 ); //' points'
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

            // energyBars
			ctx.fillStyle = this.color;
			ctx.fillRect( this.energyBarStartX, this.startY + i*this.distance, this.fullBarWidth * (currentPlayer.energy / 100), this.fullBarHeight);

            // lifeLabels
			ctx.fillStyle = 'white';
			ctx.font = '' + 20 + 'pt Comic Sans MS';
			ctx.fillText( currentPlayer.energy + ' %', this.lifeLabelStartX, (this.startY + 30) + i*this.distance );

            // colorBar
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(this.colorBarStartX, this.startY + i*this.distance, this.energyBarStartX/2, this.fullBarHeight);
		}

	};


	StatusManager.prototype.createPanel = function ( factor ) {

		var cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d'),
            container_right = document.getElementById('container-right');

        this.offset = container_right.offsetWidth;
		cvs.width = this.offset;
		cvs.height = window.innerHeight;

		this.start = this.screen.cvs.width - this.offset;
		this.panel = ctx;
        this.canvas = cvs;
        this.setBackground();

        cvs.id = 'game-r'; // statusManager
        cvs.className = 'hide';

        // document.body.appendChild( cvs );
        container_right.appendChild( cvs );
	};


    StatusManager.prototype.setBackground = function () {
        this.panel.fillStyle = '#000';
		this.panel.fillRect( 0, 0, this.panel.canvas.width, this.panel.canvas.height );
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

        this.draw();
	};


	StatusManager.prototype.handleCollide = function ( obstacleId, playersIds ) {

        var currentObstacle = this.pool.list[obstacleId],

            type = currentObstacle.type,
            value = currentObstacle.value,
            numberOfPlayers = playersIds.length,
            currentPlayer,
            i;

        if ( type === 'damage' ) {

            for ( i = 0; i < numberOfPlayers; i++ ){

                currentPlayer = this.playerList[playersIds[i] - 1];
                if (!currentPlayer.alive) {
                    currentPlayer.revive();
                }

                if (currentPlayer.energy >= value) {
                    currentPlayer.energy -= value;
                } else {
                    currentPlayer.energy = 0;
                }
                if (currentPlayer.energy === 0) {

                    if (this.points >= config.punishPoints) {

                        this.points -= config.punishPoints;

                    } else {

                        this.points = 0;
                    }

                    if (currentPlayer.alive) {

                        currentPlayer.alive = false;
                        currentPlayer.fade();


                        setTimeout(function(){

                            if (!currentPlayer.alive) {

                                currentPlayer.revive();
                                this.draw();
                            }
                        }.bind(this), config.deadTime * 1000);
                    }
                }
            }

        } else if ( type === 'heal' ) {

            for ( i = 0; i < numberOfPlayers; i++ ){
                var healForEachPlayer = ~~(value / numberOfPlayers);
                currentPlayer = this.playerList[playersIds[i] - 1];

                if (!currentPlayer.alive) {
                    currentPlayer.revive();
                }

                currentPlayer.energy += healForEachPlayer;

                if (currentPlayer.energy > 100) currentPlayer.energy = 100;
            }

        } else { // points

            for ( i = 0; i < numberOfPlayers; i++ ){
                var pointsForEachPlayer = ~~(value / numberOfPlayers);
                currentPlayer = this.playerList[playersIds[i] - 1];

                if (!currentPlayer.alive) {
                    currentPlayer.revive();
                }

                this.points += ~~((currentPlayer.energy / 100) * pointsForEachPlayer);
            }
        }

        this.draw();

        currentObstacle.collide();
	};

    StatusManager.prototype.showEnd = function( points ) {

        var endpoints = document.getElementById("endpoints");

        if ( !endpoints ) {

            endpoints = document.createElement('div');
            endpoints.className = "endpoints";
            endpoints.id = "endpoints";
            endpoints.innerHTML = "Endpoints: " + points;
            document.body.appendChild( endpoints );

        } else {

            endpoints.innerHTML = "Endpoints: " + points;
            endpoints.style.display = "block";
        }
    };

    StatusManager.prototype.clear = function(){

		this.panel.clearRect( 0,0, this.canvas.width, this.canvas.height );
	};


})();
