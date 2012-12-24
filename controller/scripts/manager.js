(function(){

	/**
	 * [Manager description]
	 * @param {[type]} config [description]
	 */
	var Manager = controller.Manager = function ( config ) {

		// default
		this.id = 0;
		this.timer = 0;

		this.url = config.url;
		this.channel = config.channel;

		this.req = new XMLHttpRequest();


		controller.Box.prototype.manager = this;
		this.box = new controller.Box();


		// input reference
		controller.Input.prototype.manager = this;
	};



	/**
	 * [show description]
	 * @param  {[type]} category [description]
	 * @return {[type]}          [description]
	 */
	Manager.prototype.showBox = function ( category ) {

		if ( this.repeat ) clearInterval( this.repeat );

		if ( category === 1 ) { // handling on end

			this.box.cancel();

			this.id = 0;

		} else {

			this.box.label( category );
		}

	};


	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	Manager.prototype.init = function(){

		this.repeat = setInterval(function(){

			this.timer++;

			if ( this.timer === config.pollingTimer ) {

				this.timer = 0;

				this.send( config.protocolCtoS.POLLING );
			}

		}.bind(this), 1000 );
	};



	/**
	 * [handle description]
	 * @param  {[type]} action  [description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	Manager.prototype.handle = function ( action, options ) {

		var commands = {

			// 1   : this.teamname,
			1   : this.register,
			2   : this.move,
			3   : this.heal
		};

		// console.log(action, options);

		commands[ action ].call( this, options );
	};


	/**
	 * [register description]
	 * @return {[type]} [description]
	 */
	Manager.prototype.register = function( name ) {

		if ( this.id ) return;

		this.input.enable();

		this.init();


		/* serve response  */
		this.req.onload = function ( t ) {

			var res = t.currentTarget.responseText,

				temp = res.length%4,                // shorten to 4

				msg = res.substr( 0, res.length - temp ),

				data = atob( msg ),                 // base64 -> string

				action = data.charCodeAt(0);        // int

			if ( action === config.protocolStoC.START ) {

				this.id = data.charCodeAt(1);

				this.input.color = data.charCodeAt(2);

				this.input.setStyle();
			}

			if ( action === config.protocolStoC.STATUS ) {

				var state = data.charCodeAt(1);

				if ( state === 0 ) return;

				this.showBox( state );
			}

			if ( action === config.protocolStoC.FEEDBACK ) {

				var answer = data.charCodeAt(1);

				// permit to insert a form name
				//if ( answer === 1 ) this.box.askTeamname();
				//if ( answer === 2 ) this.box.goCountdown();
			}



		}.bind(this);

		this.send( config.protocolCtoS.REGISTER, name );
	};


	/**
	 * [move description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	Manager.prototype.move = function ( params ) {

		controller.move( this, params );
	};


	/**
	 * [heal description]
	 * @return {[type]} [description]
	 */
	Manager.prototype.heal = function(){

		this.send( config.protocolCtoS.HEAL );
	};


	/**
	 * [send description]
	 * @param  {[type]} action [description]
	 * @param  {[type]} option [description]
	 * @return {[type]}        [description]
	 */
	Manager.prototype.send = function ( action, option )  {

		this.timer = 0; // treshold

		this.req.open( 'POST', this.url + '?t=' + Date.now(), true );

		// console.log('action: ', action, '- option: ', option);

		// encode into base64, avoiding special characters like '0' // nur null nicht
		var data = String.fromCharCode( this.channel, this.id, action ) + ( option || '' );

		data = btoa( data );

		this.req.setRequestHeader( 'Content-Type', 'text/plain; charset=UTF-8' );

		this.req.send( data );
	};

})();
