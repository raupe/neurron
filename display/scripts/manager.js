(function(){

	var Manager = display.Manager = function()  {

		this.playerList = [];

        this.runningGame = false;

		this.grid = new display.Grid();

		this.obstaclePool = new display.ObstaclePool();

		this.statusManager = new display.StatusManager();

		this.background = new display.Background();

		display.Connection.prototype.manager = this;
		display.Debug.prototype.manager = this;
	};


	Manager.prototype.render = function(){

		var last = 0,

			delta;


		function loop ( time ) {

			delta = time - last;

			forAll( this.playerList, 'update', delta );

			forAll( this.obstaclePool.list, 'update', delta );

			this.background.update( delta );


			this.screen.clear(); // prototype

			this.background.draw();

			forAll( this.playerList, 'draw' );

			forAll( this.obstaclePool.list, 'draw' );

//			this.statusManager.draw(); // statusManager doesnt need to be drawn, it is drawn when something is updated

			last = time;

            if (this.runningGame) {

                requestAnimationFrame( loop.bind(this) );

            } else {

                this.screen.clear();
            }
		}

		requestAnimationFrame( function(time) {

			last = time;

			loop.call(this, time);

		}.bind(this) );


		function forAll ( collection, method, delta ) {

			for ( var i = 0, l = collection.length, el; i < l; i++ ) {

				el = collection[i];

				if ( el && el.visible ) { // undefined.()

					el[method]( delta );
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
			7	: this.collide,
            8   : this.end
		};

		console.log(action, options);

		commands[ action ].call( this, options );
	};


	Manager.prototype.init = function ( channelId ) {

        var qrCode = 'http://game.neurron.com/controller/?' + channelId;

        var element = document.getElementById('qrcode');

        qrCode = showQRCode(qrCode, {r: 0, g: 0, b: 255});

        if ( element.lastChild ) {

			element.replaceChild(qrCode, element.lastChild);

        } else {

			element.appendChild(qrCode);
        }

	};


	Manager.prototype.countdown = function() {

        new display.Timer( 5 * 1000, "countdown");
	};


	/* playerlist */
	Manager.prototype.start = function ( params ) {

        var qrcode = document.getElementById("qrcode");
        qrcode.style.display = "none";

		this.grid.init({

			lanes: params[0],
			circleOffset: config.circleOffset,
			distanceToUser: config.distanceToUser,
			factor: config.factor,
			circles: config.circles,
			players: params[1].length
		});

        this.runningGame = true;
		this.render();

		this.playerList	= new display.PlayerList( params[1] );

		this.statusManager.init( this.playerList );

		new display.Debug();

        new display.Timer( 1 * 60 * 1000, "timer");
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
	Manager.prototype.collide = function ( params ) {

		this.statusManager.handleCollide( params[0], params[1] );
	};

    /* final points */
    Manager.prototype.end = function ( params ) {

        this.runningGame = false;
        this.screen.clear();
        this.statusManager.showEnd(params[0]);
	};


})();


