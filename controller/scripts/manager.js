(function(){

	/**
	 * [Manager description]
	 * @param {[type]} config [description]
	 */
	var Manager = controller.Manager = function ( config ) {

		this.id = 0;
		this.timer = 0;

		this.url = config.url;
		this.channel = config.channel;

		this.req = new XMLHttpRequest();

		this.box = controller.Box;
		this.box.init( this.handle.bind(this) );

		if ( this.channel > 255 ) {

			this.box.warn( 3 );

			// input.disable();
		}

		// input reference
		controller.Input.prototype.manager = this;
	};


	/**
	 * [show description]
	 * @param  {[type]} category [description]
	 * @return {[type]}          [description]
	 */
	Manager.prototype.showBox = function ( type ) {

		if ( this.repeat ) clearInterval( this.repeat );

		if ( type === 1 ) {

			this.id = 0;
			this.box.start();

		} else { // handling on error

			this.box.warn( type );
		}

	};


	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	Manager.prototype.startTimer = function(){

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

			1   : this.register,
			2	: this.name,
			3   : this.move,
			4   : this.heal
		};

		// console.log(action, commands);

		commands[ action ].call( this, options );
	};


	/**
	 * [name description]
	 * @param  {String} teamname
	 */
	Manager.prototype.name = function ( name ) { // name

		this.input.enable();

		this.send( config.protocolCtoS.TEAMNAME, name );
	};


	/**
	 * [register description]
	 * @return {[type]} [description]
	 */
	Manager.prototype.register = function() {

		if ( this.id ) return;

		this.startTimer();


		/* serve response  */
		this.req.onload = function ( t ) {

			var res = t.currentTarget.responseText,

				temp = res.length%4,                // shorten to 4

				msg = res.substr( 0, res.length - temp ),

				data = atob( msg ),                 // base64 -> string

				action = data.charCodeAt(0);        // int


			if ( action === config.protocolStoC.STATUS ) {

				var state = data.charCodeAt(1);

				if ( state === 0 ) return;

				this.showBox( state );
			}

			if ( action === config.protocolStoC.START ) {

				this.id = data.charCodeAt(1);

				this.input.color = data.charCodeAt(2);

				this.input.setStyle();

				var name = data.charCodeAt(3);

				if ( name === 0 ) this.box.hide( this.id );
				else this.box.name();
			}

		}.bind(this);

		this.send( config.protocolCtoS.REGISTER );
	};


	/**
	 * [move description]
	 * @param  {object} params [description]
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

		// console.log('action: ', action, '- option: ', option || '/' );

		// encode into base64, avoiding special characters like '0' // nur null nicht
		var data = String.fromCharCode( this.channel, this.id, action ) + ( option || '' );

		data = btoa( data );

		this.req.setRequestHeader( 'Content-Type', 'text/plain; charset=UTF-8' );

		this.req.send( data );
	};

})();
