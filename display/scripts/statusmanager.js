(function(){

	var StatusManager = display.StatusManager = function() {

		this.originStep = 0.5;

		this.points = 0;
		this.createPanel();
	};


	StatusManager.prototype.init = function ( playerList )  {

		this.points = 0;
		this.playerList = playerList;

		this.fullBarWidth = this.offset;
		this.fullBarHeight = this.canvas.height / 16;
		this.energyBarStartX = this.offset / 8;
		this.colorBarStartX = this.energyBarStartX / 2;
		this.lifeLabelStartX = this.energyBarStartX + this.fullBarWidth + 4; // 4 offset that it doesnt catch the energybar
		this.startY = 50;
		this.color = 'green';
		this.distance = this.fullBarHeight + 10;

		this.healer = 0;
        var ctx = this.panel;
        this.gradients = [];

        for ( var i = 1, l = playerList.length; i <= l; i++ ){

            var grd;
            grd = ctx.createLinearGradient( 0, this.startY + i*this.distance, 0, (this.startY + i*this.distance) + this.fullBarHeight );
            grd.addColorStop(0, "rgb(" + config.backgroundColors[i].r + "," + config.backgroundColors[i].g + "," + config.backgroundColors[i].b + ")");
            grd.addColorStop(1, "rgb(" + config.playerColors[i].r + "," + config.playerColors[i].g + "," + config.playerColors[i].b + ")");

            this.gradients.push(grd);
		}
	};


	StatusManager.prototype.draw = function(){

		this.setBackground();

		this.showPoints();

		this.showLifeBars();
	};


	StatusManager.prototype.showPoints = function () {

		var ctx = this.panel,
			size = 2;

		ctx.fillStyle = '#0E499B';
		//ctx.font = size + 'px Fredoka One cursive';
		ctx.font = size + "em Fredoka One";

        ctx.fillText( ( display.teamname || 'neurrons' ) , this.offset/5, 30 );
		ctx.fillText( this.points + ' points', this.offset/5, 64 );
	};


	StatusManager.prototype.showLifeBars = function () {

		var ctx = this.panel,
			playerList = this.playerList,
			currentPlayer,
			r, g, b;

		for ( var i = 0, l = playerList.length; i < l; i++ ){

			currentPlayer = playerList[i];

			// energyBars
            ctx.fillStyle = this.gradients[i];
            ctx.fillRect( 0, this.startY + (i+1)*this.distance, this.fullBarWidth * ( (currentPlayer.energy - currentPlayer.diffEnergy) / 100) + 10, this.fullBarHeight );

            if ( currentPlayer.diffEnergy === 0 ) currentPlayer.animationStep = this.originStep; // default
			if ( currentPlayer.diffEnergy > 0 ) currentPlayer.diffEnergy -= currentPlayer.animationStep;
			if ( currentPlayer.diffEnergy < 0 ) currentPlayer.diffEnergy += currentPlayer.animationStep;
		}

	};


	StatusManager.prototype.createPanel = function() {

		var div = document.createElement('div'),
			cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d'),
			container_right = document.getElementById('container-right');


		this.offset = container_right.offsetWidth - 1; // ToDo
		cvs.width = this.offset;

		cvs.height = $(container_right).height();

		this.start = this.screen.cvs.width - this.offset;
		this.panel = ctx;
		this.canvas = cvs;

		this.setBackground();


		cvs.id = 'statusmanager';
		div.appendChild( cvs );

		div.id = 'game-r';
		div.className = 'wrapper show hide statusmanagerWrapper';

		container_right.appendChild( div );
	};


	StatusManager.prototype.setBackground = function () {
		this.panel.fillStyle = '#fff';
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
			this.healer.diffEnergy = -amountToHeal;

			for ( i = 0; i < numberOfPlayers; i++) {

				currentPlayer = this.playerList[playersIds[i] - 1];

				if ( currentPlayer.energy <= 90 ) {

					currentPlayer.energy += healForEachPlayer;
					currentPlayer.diffEnergy = healForEachPlayer;
				}
			}
		}
	};


	StatusManager.prototype.handleCollide = function ( obstacleId, playersIds ) {

		var currentObstacle = this.pool.list[obstacleId];

		if ( currentObstacle ) { // check existence

			var	type = currentObstacle.type,
				value = currentObstacle.value,
				numberOfPlayers = playersIds.length,
				currentPlayer,
				i;

			if ( type === 'damage' ) {

				for ( i = 0; i < numberOfPlayers; i++ ){

					currentPlayer = this.playerList[playersIds[i] - 1];

					if ( !currentPlayer.alive ) currentPlayer.revive();


					if (currentPlayer.energy >= value) {

						currentPlayer.energy -= value;

					} else {

						currentPlayer.energy = 0;
					}

					currentPlayer.diffEnergy = -value;


					if (currentPlayer.energy === 0) {

						if (this.points >= config.punishPoints) {

							this.points -= config.punishPoints;

						} else {

							this.points = 0;
						}

						if ( currentPlayer.alive ) {

							currentPlayer.die();

							currentPlayer.fade();
						}
					}
				}

			} else if ( type === 'heal' ) {

				for ( i = 0; i < numberOfPlayers; i++ ){

					var healForEachPlayer = ~~(value / numberOfPlayers);
					currentPlayer = this.playerList[playersIds[i] - 1];

					if ( !currentPlayer.alive ) currentPlayer.revive();

					currentPlayer.energy += healForEachPlayer;

					if ( currentPlayer.energy > 100 ) currentPlayer.energy = 100;

					currentPlayer.diffEnergy = currentPlayer.energy < 100 ? healForEachPlayer : 0;
				}

			} else { // points

				for ( i = 0; i < numberOfPlayers; i++ ){
					var pointsForEachPlayer = ~~(value / numberOfPlayers);
					currentPlayer = this.playerList[playersIds[i] - 1];

					if ( !currentPlayer.alive ) currentPlayer.revive();

					this.points += ~~((currentPlayer.energy / 100) * pointsForEachPlayer);
				}
			}


			if ( config.audio && currentObstacle.collisionSound ) currentObstacle.collisionSound.play();

			setTimeout(function(){	currentObstacle.collide(); }, 60);

		} else {

			console.log( 'Missed: ', obstacleId, ' - ', currentObstacle );
		}
	};


	StatusManager.prototype.showEnd = function ( points, share, competition ) {

		// fade
		setTimeout( function(){

			// highscore
			document.getElementById('score_value').children[0].textContent = points; // <h1>

			// diagram
			var stylesheet = document.styleSheets[ document.styleSheets.length-1 ],

				rules = stylesheet.cssRules.length, // || stylesheet.rules,

				colors = config.colors,

				length = share.length,

				current,	// temp
				i;			// iterator

			for ( i = 0; i < length; i++ ) {

				current = share[i];

				stylesheet.insertRule( '.'+ colors[current.color] + '{\
											width: ' + current.perc + '%;\
										}', rules + i );
			}


			// legends
			document.getElementById('category').textContent = length;

			var legends = document.getElementById('legends').children[0], // <table>

				legendContainer = document.getElementById('legends').parentNode,

				ranking = '<tbody>';

			length = competition.length;

			legendContainer.classList.remove('hide');

			if ( !length ) legendContainer.classList.add('hide');


			for ( i = 0; i < length; i++ ) {

				current = competition[i];

				if ( current.name ) {

					ranking += '\
						<tr>\
							<td>0' + (i+1) + '</td>\
							<td>' + current.name + '</td>\
							<td>' + current.score + '</td>\
						</tr>\
					';
				}
			}

			ranking += '</tbody>';

			legends.innerHTML = ranking;

		}, 16.7 );
	};


	StatusManager.prototype.clear = function(){

		this.panel.clearRect( 0,0, this.canvas.width, this.canvas.height );
        this.canvas.height = $(document.getElementById('container-right')).height();
	};


})();
