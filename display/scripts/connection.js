(function(){

	var amount = 0;

	var Connection = display.Connection = function() {

		this.url = "ws://" + config.server + ":" + config.port;

		this.initializeSocket();
	};

	Connection.prototype.warning = function(){

		var warning = document.getElementById('warning'),
			supportTouch = 'ontouchstart' in window;

		warning.classList.remove('hide');

		warning.addEventListener( supportTouch ? 'touchend' : 'click', remove );

		function remove() {

			warning.classList.add('hide');

			warning.removeEventListener( supportTouch ? 'touchend' : 'click', remove );
		}
	};


	Connection.prototype.initializeSocket = function(){


		if ( !WebSocket ) {

			this.warning();

			return;
		}

		this.socket = new WebSocket( this.url );

		var manager = this.manager;


		this.socket.onopen = function(){

			console.log('[open]');
		};

		this.socket.onclose = function( msg ){

			console.log('[close]');
		};


		this.socket.onmessage = function ( msg ) {

			var data = atob( msg.data ),			// base64 -> string

				action = data.charCodeAt(0),		// int

				options = [],						// params

				pos,								// temp

				i, l;								// iterator


	/*  0 */if ( action === config.protocol.POLLING ) return;


	/*  1 */if ( action === config.protocol.INIT ) {

				options[0] = data.charCodeAt(1); // channel ID
			}

	/*  2 - team name will be entered */

	/*  3 - cancel the game */

	/*  4 */if ( action === config.protocol.COUNTDOWN ) {

				options[0] = data.charCodeAt(1);	// time
				options[1] = data.substr(2);		// teamname
			}

	/*  5 */if ( action === config.protocol.JOINED ) {

				options[0] = data.charCodeAt(1); // playerID
				options[1] = data.charCodeAt(2); // playerColor
			}


	/*  6 */if ( action === config.protocol.START ) {

				l = data.charCodeAt(1);				// amount of players

				amount = l; // ~ cache

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


	/*  7 */if ( action === config.protocol.MOVE ) {

				options[0] = data.charCodeAt(1); // player ID
				options[1] = data.charCodeAt(2); // next pos
			}


	/*  8 */if ( action === config.protocol.HEAL ) {

				options[0] = data.charCodeAt(1); // player ID

				l = data.charCodeAt(2); // amount of targets

				var targets = [];

				for ( i = 3; i < l+3; i++ ) {

					targets.push( data.charCodeAt(i) );
				}

				options[1] = targets;
			}


	/*  9 */if ( action === config.protocol.CREATE ) {

				var wave = [];

				pos = 1;

				l = data.charCodeAt(pos++);

				for ( i = 0; i < l; i++ ) {

					wave.push({

						id		: data.charCodeAt(pos++),
						category: data.charCodeAt(pos++),
						start	: data.charCodeAt(pos++)
					});
				}

				options[0] = wave; // wave
			}


	/* 10 */if ( action === config.protocol.COLLISION ) {

				options[0] = data.charCodeAt(1); // obstacle ID

						l =  data.charCodeAt(2); // amount of players

				var playerIds = [];

				for ( i = 3; i < l+3; i++ ) {

					playerIds.push( data.charCodeAt(i) );
				}

				options[1] = playerIds;
			}

	/* 11 */if ( action === config.protocol.END ) {

				var distribution = [],
					scores = [];

				pos = 1;

                options[0] = (data.charCodeAt(pos++) << 8) + data.charCodeAt(pos++); // teampoints

				for ( i = 0; i < amount; i++ ) {

					distribution.push({

						color	: data.charCodeAt(pos++),
						perc	: data.charCodeAt(pos++)
					});
				}

                options[1] = distribution;// share

				var name, score, entries, length;

				for ( entries = 0; entries < 3; entries++ ) {

					length = data.charCodeAt(pos++);
					name = '';

					name = data.substr(pos, length);
					pos += length;

					score = (data.charCodeAt(pos++) << 8) + data.charCodeAt(pos++);

					scores.push({

						name	: name,
						score	: score
					});
				}

                options[2] = scores; // scores
            }


			manager.handle( action, options );
		};

		this.socket.onerror = function ( err ) {

			console.log('[error] ', err );
		};

	};

})();

