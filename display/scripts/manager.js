(function(){

	var Manager = display.Manager = function()  {

		this.playerList = [];

		this.grid = new display.Grid();

		this.obstaclePool = new display.ObstaclePool();

		this.statusManager = new display.StatusManager();

		this.background = new display.Background();

		this.render();

		display.Connection.prototype.manager = this;
		display.Debug.prototype.manager = this;
	};


	Manager.prototype.render = function(){

		(function loop ( delta ) {

			this.screen.clear(); // prototype

			forAll( this.playerList, 'update' );

			forAll( this.obstaclePool.list, 'update' );

			this.background.update();
			this.background.draw();

			forAll( this.playerList, 'draw' );

			forAll( this.obstaclePool.list, 'draw' );

			this.statusManager.draw();


			requestAnimationFrame( loop.bind(this) );

		}.bind(this) )();


		function forAll ( collection, method ) {

			for ( var i = 0, l = collection.length, el; i < l; i++ ) {

				el = collection[i];

				if ( el && el.visible ) { // undefined.()

					el[method]();
				}
			}
		}
	};




	Manager.prototype.handle = function ( action, options ) {

		var commands = {

			1	: this.init,
			2	: this.countdown,
			3	: this.start,
			4	: this.move,
			5	: this.heal,
			6	: this.create,
			7	: this.collide
		};

		console.log(action, options);

		commands[ action ].call( this, options );
	};



	Manager.prototype.countdown = function() {

		console.log('countdown...');
	};


	Manager.prototype.init = function ( channelId ) {

        var qrCode = "http://game.neurron.com/controller/#" + channelId;

        var element = document.getElementById("qrcode");

        var bodyElement = document.body;

        if ( element.lastChild ) {

			element.replaceChild(showQRCode(qrCode), element.lastChild);

        } else {

			element.appendChild(showQRCode(qrCode));
        }
	};

	/* playerlist */
	Manager.prototype.start = function ( params ) {

		this.grid.init({

			players: 8,				// players.length,
			frames: 30,
			distanceToUser: 350,
			circleOffset: 100,
			circles: 0,
			factor: config.factor
		});

		this.playerList	= new display.PlayerList( params[0] );

		this.statusManager.init( this.playerList );
        this.statusManager.handleHeal();

		new display.Debug();
	};


	/* playerId - nextPos */
	Manager.prototype.move = function ( params ) {

		this.playerList[ params[0]-1 ].move( params[1] );
	};

	/* playerId - targets */
	Manager.prototype.heal = function ( params ) {

		this.statusManager.handleHeal( params[0], params[1] );
	};


	/* obstacleId - category - start */
	Manager.prototype.create = function ( params ) {

		this.obstaclePool.get( params[0], params[1], params[2] );
	};


	/* obstacleId - players */
	Manager.prototype.collide = function( params ) {

		this.statusManager.handleCollide( params[0], params[1] );
	};


})();


