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

			var req = new XMLHttpRequest();

			req.open( 'POST', config.errorURL, true );

			req.setRequestHeader( 'Content-Type', 'text/plain; charset=UTF-8' );

//			req.send( ': Socket - closed :' );
		};


		this.socket.onmessage = function ( msg ) {

			var data = atob( msg.data ),			// base64 -> string

				action = data.charCodeAt(0),		// int

				options = [],						// params

				i, l;								// iterator


	/* 0 */	if ( action === config.protocol.POLLING ) return;


	/* 1 */	if ( action === config.protocol.INIT ) {

				options[0] = data.charCodeAt(1); // channel ID
			}

	/* 2 - team name will be entered */

	/* 3 - cancel the game */

	/* 4 */if ( action === config.protocol.COUNTDOWN ) {

				options[0] = data.charCodeAt(1);	// time
				options[1] = data.substr(1);		// teamname
			}

	/* 5 */ if ( action === config.protocol.JOINED ) {

				options[0] = data.charCodeAt(1); // playerID
				options[1] = data.charCodeAt(2); // playerColor
			}


	/* 6 */	if ( action === config.protocol.START ) {

				l = data.charCodeAt(1);				// amount of players

				options[0] = data.charCodeAt(2);	// amount of lanes

				var players = [],
					counter = 1;

				for ( i = 3; i < l+3; i++ ) {

					players.push({

						id		: counter++,
						pos		: data.charCodeAt(i)
					});
				}

				options[1] = players;
			}


	/* 7 */	if ( action === config.protocol.MOVE ) {

				options[0] = data.charCodeAt(1); // player ID
				options[1] = data.charCodeAt(2); // next pos
			}


	/* 8 */	if ( action === config.protocol.HEAL ) {

				options[0] = data.charCodeAt(1); // player ID

						l = data.charCodeAt(2); // amount of targets

				var targets = [];

				for ( i = 3; i < l+3; i++ ) {

					targets.push( data.charCodeAt(i) );
				}

				options[1] = targets;
			}


	/* 9 */	if ( action === config.protocol.CREATE ) {

				options[0] = data.charCodeAt(1); // obstacle ID
				options[1] = data.charCodeAt(2); // category
				options[2] = data.charCodeAt(3); // startpos
			}


	/* 10 */	if ( action === config.protocol.COLLISION ) {

				options[0] = data.charCodeAt(1); // obstacle ID

						l =  data.charCodeAt(2); // amount of players

				var playerIds = [];

				for ( i = 3; i < l+3; i++ ) {

					playerIds.push( data.charCodeAt(i) );
				}

				options[1] = playerIds;
			}

	/* 11 */if ( action === config.protocol.END ) {

                options[0] = (data.charCodeAt(1) << 8) + data.charCodeAt(2); // team points
            }


			manager.handle( action, options );
		};

		this.socket.onerror = function ( err ) {

			console.log('[error] ', err );
		};

	};

})();

