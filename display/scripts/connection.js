(function(){

	var Connection = display.Connection = function() {

		this.url = "ws://" + config.server + ":" + config.port;

		this.initializeSocket();
	};


	Connection.prototype.initializeSocket = function(){

		this.socket = new WebSocket( this.url );

		var manager = this.manager;


		this.socket.onopen = function(){

			console.log('[open]');
		};

		this.socket.onclose = function( msg ){

			console.log('[close]');

			manager.handle( config.protocol.START, [ { id:1, pos:1, color:'55' } ] );
		};


		this.socket.onmessage = function ( msg ) {

			var data = atob( msg.data ),			// base64 -> string

				action = data.charCodeAt(0),		// int

				options = [],						// params

				i, l;								// iterator


	/* 1 */	if ( action === config.protocol.INIT ) {

				options[0] = data.charCodeAt(1); // channel ID
			}


	/* 2 */	if ( action === config.protocol.START ) {

					l = 2 * data.charCodeAt(1); // amount of players

				var players = [];

				for ( i = 2; i < l+2; i += 2 ) {

					players.push({

						id		: i/2,
						pos		: data.charCodeAt(  i),
						color	: data.charCodeAt(1+i)
					});
				}

				options[0] = players;
			}


	/* 3 */	if ( action === config.protocol.MOVE ) {

				options[0] = data.charCodeAt(1); // player ID
				options[1] = data.charCodeAt(2); // next pos
			}


	/* 4 */	if ( action === config.protocol.HEAL ) {

				options[0] = data.charCodeAt(1); // player ID

						l = data.charCodeAt(2); // amount of targets

				var targets = [];

				for ( i = 3; i < l+3; i++ ) {

					targets.push( data.charCodeAt(i) );
				}

				options[1] = targets;
			}


	/* 5 */	if ( action === config.protocol.CREATE ) {

				options[0] = data.charCodeAt(1); // obstacle ID
				options[1] = data.charCodeAt(2); // category
				options[2] = data.charCodeAt(2); // position
			}


	/* 6 */	if ( action === config.protocol.COLLISION ) {

				options[0] = data.charCodeAt(1); // obstacle ID

						l =  data.charCodeAt(2); // amount of players

				var playerIds = [];

				for ( i = 2; i < l+2; i++ ) {

					playerIds.push( data.charCodeAt(i) );
				}

				options[1] = playerIds;
			}


			manager.handle( action, options );
		};

		this.socket.onerror = function ( err ) {

			console.log('[error] ', err );
		};
	};

})();
