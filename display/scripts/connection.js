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

            // manager.init(1);

			manager.handle( config.protocol.START, [ 4, [

                { id:1, pos:1, color:{r: 255, g: 0, b: 0} }
   //              { id:2, pos:2, color:{r: 0, g: 255, b: 0} },
   //              { id:3, pos:4, color:{r: 0, g: 0, b: 255} }
            ]] );

		};


		this.socket.onmessage = function ( msg ) {

			var data = atob( msg.data ),			// base64 -> string

				action = data.charCodeAt(0),		// int

				options = [],						// params

				i, l;								// iterator


			if ( action === config.protocol.POLLING ) return;


	/* 1 */	if ( action === config.protocol.INIT ) {

				options[0] = data.charCodeAt(1); // channel ID
			}


	/* 3 */	if ( action === config.protocol.START ) {

				l = 2 * data.charCodeAt(1); // amount of players

				options[0] = data.charCodeAt(2); // amount of lanes


				var players = [];

				for ( i = 3; i < l+3; i += 2 ) {

					players.push({

						id		: i/2,
						pos		: data.charCodeAt(  i),
						color	: data.charCodeAt(1+i)
					});
				}

				options[1] = players;
			}


	/* 4 */	if ( action === config.protocol.MOVE ) {

				options[0] = data.charCodeAt(1); // player ID
				options[1] = data.charCodeAt(2); // next pos
			}


	/* 5 */	if ( action === config.protocol.HEAL ) {

				options[0] = data.charCodeAt(1); // player ID

						l = data.charCodeAt(2); // amount of targets

				var targets = [];

				for ( i = 3; i < l+3; i++ ) {

					targets.push( data.charCodeAt(i) );
				}

				options[1] = targets;
			}


	/* 6 */	if ( action === config.protocol.CREATE ) {

				options[0] = data.charCodeAt(1); // obstacle ID
				options[1] = data.charCodeAt(2); // category
				options[2] = data.charCodeAt(3); // startpos
			}


	/* 7 */	if ( action === config.protocol.COLLISION ) {

				options[0] = data.charCodeAt(1); // obstacle ID

						l =  data.charCodeAt(2); // amount of players

				var playerIds = [];

				for ( i = 3; i < l+3; i++ ) {

					playerIds.push( data.charCodeAt(i) );
				}

				options[1] = playerIds;
			}

	/* 8 */	if ( action === config.protocol.END ) {

                options[0] = (data.charCodeAt(1) << 8) + data.charCodeAt(2); // Teampunktzahl
            }


			manager.handle( action, options );
		};

		this.socket.onerror = function ( err ) {

			console.log('[error] ', err );
		};

	};

})();

