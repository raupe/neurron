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


			this.screen.clear();

			this.background.draw();

			forAll( this.playerList, 'draw' );

			forAll( this.obstaclePool.list, 'draw' );



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

            var l = collection.length;

            do {

				el = collection[l];

				if ( el && el.visible ) { // undefined.()

					el[method]( delta );
				}

            } while ( l-- );

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

		// console.log(action, options);

		commands[ action ].call( this, options );
	};


	Manager.prototype.init = function ( channelId ) {

        var qrLink = 'http://game.neurron.com/controller/?' + channelId,

            element = document.getElementById('qr_code'),

            qrCode = showQRCode( qrLink, {r: 0, g: 0, b: 0});

        if ( element.lastChild ) {

			element.replaceChild(qrCode, element.lastChild);

        } else {

			element.appendChild(qrCode);
        }

        var linkBox = document.createElement('div');
        linkBox.className = "qr_link";
        linkBox.innerHTML = '<a href="'+ qrLink +'">' + qrLink + '</a>';

        element.insertBefore( linkBox, qrCode.nextSibling );
	};


	Manager.prototype.name = function ( params ) {

		// receive name + show
	};


	/* playerId */
	Manager.prototype.countdown = function ( params )  {

		if ( !this.timer ) {

			display.show( 'load' );
			this.timer = new display.Timer( params[0] * 1000, 'countdown', "load_countdown_timer");

		}

		// action: show color
		console.log('[player]: ', params[1] );
        display.load_view.showNewPlayer();
	};


	/* playerlist */
	Manager.prototype.start = function ( params ) {
        display.load_view.clearPlayerNums();
//        display.show( 'game' );
		// reset timer
		this.timer = null;

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

        new display.Timer( config.gameTime * 60 * 1000, "timer");

        var endpoints = document.getElementById("endpoints");

        if (endpoints) endpoints.style.display = "none";
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

        this.obstaclePool.list.length = 0;
        this.obstaclePool.pool.length = 0;
        this.playerList.length = 0;

        this.statusManager.showEnd(params[0]);
        this.statusManager.clear();

        display.show( 'end' );
	};


})();


