(function(){

	/**
	 * [Manager description]
	 */
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


	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
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


	/**
	 * [handle description]
	 * @param  {[type]} action  [description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	Manager.prototype.handle = function ( action, options ) {

        var commands = {

			1	: this.init,
			2	: this.teamname,
			3	: this.cancel,
			4	: this.countdown,
			5	: this.joined,
			6	: this.start,
			7	: this.move,
			8	: this.heal,
			9	: this.create,
			10	: this.collide,
            11  : this.end
		};

		// console.log(action, options);

		commands[ action ].call( this, options );
	};

	/**
	 * [init description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	Manager.prototype.init = function ( params ) {

        var qrLink = 'http://game.neurron.com/controller/?' + params[0],

            element = document.getElementById('qr_code'),

            qrCode = showQRCode( qrLink, { r: 14, g: 73, b: 155 });

        if ( element.lastChild ) {

			element.replaceChild(qrCode, element.lastChild);

        } else {

			element.appendChild(qrCode);
        }

        var linkBox = document.createElement('div');
        linkBox.className = "qr_link";
        linkBox.innerHTML = '<a target="_blank" href="'+ qrLink +'">' + qrLink + '</a>';

        element.insertBefore( linkBox, qrCode.nextSibling );
	};


	/**
	 * [teamname description]
	 * @return {[type]} [description]
	 */
	Manager.prototype.teamname = function() {

		display.show( 'load' );

		// show a box -> teamname will be entered
		console.log('teamname will be entered');
	};


	/**
	 * [cancel description]
	 * @return {[type]} [description]
	 */
	Manager.prototype.cancel = function(){

		display.show( 'start' );

		console.log('[game canceled]');
	};


	/**
	 * [countdown description]
	 * @param  {[type]} params [description]		| playerId
	 * @return {[type]}        [description]
	 */
	Manager.prototype.countdown = function ( params )  {

        /*TODO: call load scene before countdown, after name input call
         *display.load_view.hideLoadBar() to hide load bar and call display.load_view.greetTeam()
         *when countdown starts to greet the team :) */
		if ( display.current !== 'load' ) display.show( 'load' );
        display.load_view.hideLoadBar();
        display.load_view.greetTeam();

		this.timer = new display.Timer( params[0] * 1000, 'countdown', "load_countdown_timer");

		display.teamname = params[1];
		console.log('team-name: ', display.teamname );
	};


	/**
	 * [joined description]
	 * @param  {[type]} params [description]		| playerId, playerColor
	 * @return {[type]}        [description]
	 */
	Manager.prototype.joined = function ( params ) {

		display.load_view.showNewPlayer( params[0] );
	};


	/**
	 * [start description]
	 * @param  {[type]} params [description]		| playerlist
	 * @return {[type]}        [description]
	 */
	Manager.prototype.start = function ( params ) {
        display.load_view.clearLoadScene();
        display.show( 'game' );

		this.grid.init({

			lanes: params[0],
			circleOffset: config.circleOffset,
			distanceToUser: config.distanceToUser,
			factor: config.factor,
			circles: config.circles,
			players: params[1].length
		});

        this.runningGame = true;


		this.playerList	= new display.PlayerList( params[1] );

		this.statusManager.init( this.playerList );

		this.render();

        new display.Timer( config.gameTime * 60 * 1000, 'timer' );

        var endpoints = document.getElementById('endpoints');

        if (endpoints) endpoints.style.display = 'none';

		new display.Debug();
	};


	/* playerId - nextPos */
	/**
	 * [move description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	Manager.prototype.move = function ( params ) {

		this.playerList[ params[0]-1 ].move( params[1] );
	};


	/* playerId - targets */
	/**
	 * [heal description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	Manager.prototype.heal = function ( params ) {

		this.statusManager.handleHeal( params[0], params[1] );
	};


	/* obstacleId - category - start */
	/**
	 * [create description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	Manager.prototype.create = function ( params ) {

		this.obstaclePool.get( params[0], params[1], params[2] );
	};


	/* obstacleId - players */
	/**
	 * [collide description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	Manager.prototype.collide = function ( params ) {

		this.statusManager.handleCollide( params[0], params[1] );
	};

    /* final points */
    /**
     * [end description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    Manager.prototype.end = function ( params ) {

        display.show( 'end' );

        this.runningGame = false;
        this.screen.clear();

        this.obstaclePool.list.length = 0;
        this.obstaclePool.pool.length = 0;
        this.playerList.length = 0;

        this.statusManager.showEnd(params[0]);
        this.statusManager.clear();
	};


})();


