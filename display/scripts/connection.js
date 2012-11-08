(function(){

	var Connection = display.Connection = function( config ){

		this.controller = config.controller;
		this.url = "ws://" + config.server + ":" + config.port;

		this.initializeSocket();
	};


	Connection.prototype.initializeSocket = function(){

		this.socket = new WebSocket( this.url );
		var controller = this.controller;

		this.socket.onopen = function(){

			console.log('[open]');
		};

		this.socket.onclose = function( msg ){

			console.log('[close]');
		};


		this.socket.onmessage = function ( msg ) {

			// console.log(msg);

			var data = msg.data;

			// base64 -> string
			data = atob( data );


			// int
			var change = data.charCodeAt(0); // 1

			// string
			change = config.protocol[ change ]; // channel



			var options = [];


			if ( change === 'channel' ) {

				options[0] = data.charCodeAt(1); // channel id
			}

			if ( change === 'create' ) {

				options[0] = data.charCodeAt(1); // element type
				options[1] = data.charCodeAt(2); // element id
				options[2] = data.charCodeAt(3); // element position
			}

			if ( change === 'move') {

				options[0] = data.charCodeAt(1); // element Id
				options[1] = data.charCodeAt(2); // direction
			}

			if ( change === 'remove' ) {

				options[0] = data.charCodeAt(1); // element type
				options[1] = data.charCodeAt(2); // element id
			}

			controller.handle( change, options );
		};

		this.socket.onerror = function ( err ) {

			console.log('[error] ', err );
		};
	};

})();
