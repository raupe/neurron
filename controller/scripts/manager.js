(function(){

	var Manager = controller.Manager = function ( config ) {

		this.id = 0; // default
		this.timer = 0;

		this.url = config.url;
		this.channel = config.channel;

		this.req = new XMLHttpRequest();
		this.box = new controller.Box();


		this.init();

		controller.Input.prototype.manager = this;
		controller.Box.prototype.manager = this;
	};



	Manager.prototype.handle = function ( action, options ) {

		var commands = {

			1	: this.register,
			2	: this.move,
			3	: this.heal
		};

		// console.log(action, options);

		commands[ action ].call( this, options );
	};




	Manager.prototype.show = function ( category ) {

		var button = config.boxes[ category ];

		this.box.set( button[0], button[1] ); // type - text
	};


	Manager.prototype.init = function(){

		setInterval(function(){

			this.timer++;

			if ( this.timer === config.pollingTimer ) {

				this.timer = 0;

				this.send( 8 ); // polling - check end
			}

		}.bind(this), config.pollingTimer * 1000 );
	};



	Manager.prototype.register = function(){

		if ( this.id ) return;

		this.init();

		this.box.hide();

		/* serve response  */
		this.req.onload = function ( t ) {

			var res = t.currentTarget.responseText,

				temp = res.length%4,				// shorten to 4

				msg = res.substr( 0, res.length - temp ),

				data = atob( msg ),					// base64 -> string

				action = data.charCodeAt(0);		// int

			if ( action === config.protocol.START ) {

				this.id = data.charCodeAt(1);
				var color = data.charCodeAt(2);

				this.color = config.playerColors[ color ];
			}

			if ( action === config.protocol.STATUS ) {

				var state = data.charCodeAt(1);

				if ( state === 0 ) return;

				console.log('state: ', state);

				this.show( state );
			}

		}.bind(this);

		// /* on remove */
		// document.onbeforeunload = function(){};

		this.send( 1 );
	};




	Manager.prototype.move = function ( params ) {

			var starts = params[0],
				ends = params[1],
				direction = params[2];

		if ( !direction ) {

			var start = { x: starts[0].clientX, y: starts[0].clientY},
				end = { x: ends[0].clientX, y: ends[0].clientY},
				diffX = Math.abs(end.x - start.x),
				diffY = Math.abs(end.y - start.y);

			if ( start.x > end.x ) {

				direction = 4; // links

			} else {

				direction = 3; // rechts
			}
		}

		this.send( direction );
	};



	Manager.prototype.heal = function(){

		this.send( 5 );
	};


	Manager.prototype.send = function ( action )  {

		this.timer = 0; // treshold

		this.req.open( 'POST', this.url , true );

		// encode into base64, avoiding special characters like '0'
		var data = btoa( String.fromCharCode(  this.channel, this.id, action ) );

		this.req.setRequestHeader( 'Content-Type', 'text/plain; charset=UTF-8' );

		this.req.send( data );
	};


})();
