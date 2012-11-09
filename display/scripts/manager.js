(function(){

	var Manager = display.Manager = function()  {

		this.playerList = [];

		this.obstaclePool = new display.ObstaclePool();

		this.statusManager = new display.StatusManager();

		this.background = new display.Background();

		this.render();

		display.Connection.prototype.manager = this;
		display.Debug.prototype.manager = this;
	};


	Manager.prototype.render = function(){

		(function loop(){

			requestAnimationFrame( loop.bind(this) );


			this.screen.clear();


			forAll( this.playerList, 'update' );

			forAll( this.obstaclePool, 'update' );


			this.background.draw();

			forAll( this.playerList, 'draw' );

			this.obstaclePool.list.forEach(function ( obstacle ) {

				if ( obstacle.visible ) {

					obstacle.draw();
				}
			});

			this.statusManager.draw();


		}.bind(this) )();


		function forAll ( collection, method ) {

			for ( var i = 0, l = collection.length; i < l; i++ ) {

				collection[i][method]();
			}
		}
	};




	Manager.prototype.handle = function ( action, options ) {

		var commands = {

			1	: this.init,
			2	: this.start,
			3	: this.move,
			4	: this.heal,
			5	: this.create,
			6	: this.collide
		};

		commands[ action ].call( this, options );
	};




	Manager.prototype.init = function ( channelId ) {

		console.log('Create QR-code from: ', channelId );
	};


	Manager.prototype.start = function ( players ) {

		new display.Grid({

			players: 10,//players.length,
			frames: 30,
			distanceToUser: 350,
			circleOffset: 100,
			circles: 0
		});

		this.playerList	= new display.PlayerList( players );

		new display.Debug();
	};



	Manager.prototype.move = function ( playerId, nextPos ) {

		console.log('playerId:', playerId, ' - nextPos: ', nextPos );

		this.playerList[playerId].move( nextPos );
	};


	Manager.prototype.heal = function ( playerId, targets ) {

		this.statusManager.handleHeal( playerId, targets );
	};



	Manager.prototype.create = function ( obstacleId, category, position ) {

		this.obstacePool.get( obstacleId, category, position );
	};



	Manager.prototype.collide = function( obstacleId, players ) {

		this.statusManager.handleCollide( obstacleId, players);
	};


})();


