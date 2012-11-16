(function(){

	var Manager = controller.Manager = function ( config ) {

		this.req = new XMLHttpRequest();
		this.url = config.url;

		this.id = 0; // defaults
		this.channel = config.channel;


		this.commands = {

			1: 'The game has ended',
			2: 'The game is already running',
			3: 'Game not found'
		};

		controller.Input.prototype.manager = this;
		controller.Button.prototype.manager = this;
	};


	Manager.prototype.start = function(){

		this.register();
	};


	Manager.prototype.show = function ( text ) {

		console.log('[button/label] ' + text );
	};


	Manager.prototype.register = function(){

		/* serve response  */
		this.req.onload = function ( t ) {

			var res = t.currentTarget.responseText,

				temp = res.length%4,				// shorten to 4

				msg = res.substr( 0, res.length - temp ),

				data = atob( msg ),					// base64 -> string

				action = data.charCodeAt(0);		// int

			if ( action === config.protocol.START ) { //

				this.id = data.charCodeAt(1);
				this.color = data.charCodeAt(2);
			}

			if ( action === config.protocol.STATUS ) {

				var state = data.charCodeAt(1);

				if ( state === 0 ) return;

				this.show( commands[ state ] );
			}

		}.bind(this);

		// /* on remove */
		// document.onbeforeunload = function(){

		// };


		this.send( 1 );
	};


	Manager.prototype.delegate = function ( starts, ends ) {

        var start = { x: starts[0].clientX, y: starts[0].clientY},
            end = { x: ends[0].clientX, y: ends[0].clientY},
            diffX = Math.abs(end.x - start.x),
            diffY = Math.abs(end.y - start.y),
            direction;

        if ( diffX > diffY ) {

            if ( start.x > end.x ) {

                direction = 4; // links

            } else {

                direction = 3; // rechts
            }

			this.send( direction );
        }


        // else {

        //     if ( start.y > end.y ) {

        //         direction = 5;//hoch

        //     } else {

        //         direction = 6;//unten
        //     }
        // }


	};


	Manager.prototype.send = function ( action )  {

		this.req.open( 'POST', this.url , true );

		// encode into base64, avoiding special characters like '0'
		var data = btoa( String.fromCharCode(  this.channel, this.id, action ) );
		console.log(this.channel);
		this.req.setRequestHeader( 'Content-Type', 'text/plain; charset=UTF-8' );

		this.req.send( data );
	};


})();
