(function(){

	var url = 'http://' + config.server + ':' + config.port,
		channel = window.location.search.substr(1);

		req = new XMLHttpRequest(),
		box = controller.Box,
		input = controller.Input,

		timer = 0, id = 0,
		repeat = null;

	// simple warning
	if ( channel > 255 || channel < 0 ) box.warn( 3 );


	// ----------------- private -----------------

	/**
	 * [send description]
	 * @param  {[type]} action [description]
	 * @param  {[type]} option [description]
	 * @return {[type]}        [description]
	 */
	function send ( action, option )  {

		timer = 0; // treshold

		req.open( 'POST', url + '?t=' + Date.now(), true );

		// console.log('action: ', action, '- option: ', option || '/' );

		// encode into base64, avoiding special characters like '0' // nur null nicht
		var data = String.fromCharCode( channel, id, action ) + ( option || '' );

		data = btoa( data );

		req.setRequestHeader( 'Content-Type', 'text/plain; charset=UTF-8' );

		req.send( data );
	}


	/**
	 * [show description]
	 * @param  {[type]} category [description]
	 * @return {[type]}          [description]
	 */
	function changeView ( type ) {

		if ( repeat ) clearInterval( repeat );

		if ( type === 1 ) {

			id = 0;
			box.start();

		} else { // handling on error

			box.warn( type );
		}

		input.setStyle( 0 );
		input.active( false );
	}


	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	function startTimer(){

		repeat = setInterval(function(){

			timer++;

			if ( timer === config.pollingTimer ) {

				timer = 0;

				send( config.protocolCtoS.POLLING );
			}

		}, 1000 );
	}




	// ----------------- public -----------------

	/**
	 * [name description]
	 * @param  {String} teamname
	 */
	var name = function ( string ) { // name

		input.active( true );

		send( config.protocolCtoS.TEAMNAME, string );
	};


	/**
	 * [register description]
	 * @return {[type]} [description]
	 */
	var register = function() {

		if ( id ) return;

		startTimer();

		/* serve response  */
		req.onload = function ( t ) {

			var res = t.currentTarget.responseText,

				temp = res.length%4,                // shorten to 4

				msg = res.substr( 0, res.length - temp ),

				data = atob( msg ),                 // base64 -> string

				action = data.charCodeAt(0);        // int


			if ( action === config.protocolStoC.STATUS ) {

				var state = data.charCodeAt(1);

				if ( state === 0 ) return;

				changeView( state );
			}

			if ( action === config.protocolStoC.START ) {

				id = data.charCodeAt(1);

				input.setStyle( data.charCodeAt(2) );

				var name = data.charCodeAt(3);

				if ( name === 0 ) {

					box.skip( id );
					input.active( true );

				} else {

					box.name();
				}
			}
		};

		send( config.protocolCtoS.REGISTER );
	};


	/**
	 * [move description]
	 * @param  {object} params [description]
	 * @return {[type]}        [description]
	 */
	var move = function ( params ) {

		controller.Move( send, params );
	};


	/**
	 * [heal description]
	 * @return {[type]} [description]
	 */
	// var heal = function(){

	//	send( config.protocolCtoS.HEAL );
	// };


	// Interface
	var Manager = {

		register: register,
		name	: name,
		move	: move
		// heal	: heal
	};


	// init
	box.init( Manager );
	input.init( Manager );

})();
