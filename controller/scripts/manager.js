(function(){

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

		var params = config.boxes[ category ];

		this.box.set( params[0], params[1] ); // type - text

		if ( this.repeat ) clearInterval( this.repeat );

		if ( category === 1 ) { // handling on end

			this.id = 0;
		}
	};




	Manager.prototype.init = function(){

		this.repeat = setInterval(function(){

			this.timer++;

			if ( this.timer === config.pollingTimer ) {

				this.timer = 0;

				this.send( 10 ); // polling - check end
			}

		}.bind(this), 1000 );
	};




	Manager.prototype.register = function(){

		if ( this.id ) return;

		this.box.hide(); // hide for development

        this.input.enable();


		this.init();


		/* serve response  */
		this.req.onload = function ( t ) {

			var res = t.currentTarget.responseText,

				temp = res.length%4,				// shorten to 4

				msg = res.substr( 0, res.length - temp ),

				data = atob( msg ),					// base64 -> string

				action = data.charCodeAt(0);		// int

			if ( action === config.protocolStoC.START ) {

				this.id = data.charCodeAt(1);
				this.color = config.playerColors[ data.charCodeAt(2) ];

				this.input.setStyle( this.color );
			}


			if ( action === config.protocolStoC.STATUS ) {

				var state = data.charCodeAt(1);

				if ( state === 0 ) return;

				this.show( state );
			}

		}.bind(this);

		// /* on remove */
		// document.onbeforeunload = function(){};

		this.send( config.protocolCtoS.START );
	};




	Manager.prototype.move = function ( params ) {

		var start = params[0],
			end = params[1],

            averageX = params[2],
            averageY = params[3];


		if ( starts.length === 0 ) return;

            start = { x: start.clientX, y: start.clientY},
			end = { x: end.clientX, y: end.clientY};

        var	diffX = Math.abs(end.x - start.x),
			diffY = Math.abs(end.y - start.y),
            startEndX = (start.x + end.x) / 2,
            startEndY = (start.y + end.y) / 2;

        // todo direction im protokoll definieren und setzen
		if ( diffX > diffY ) { // if horizontal or vertical

			if ( start.x < end.x ) { // if from left to right

                if ( averageY < startEndY ) { // if clockwise or anticlockwise

                    direction = config.protocolCtoS.CLOCKWISE; // clockwise

                } else {

                    direction = config.protocolCtoS.ANTICLOCKWISE; // anticlockwise
                }

			} else {

				if ( averageY > startEndY ) { // if clockwise or anticlockwise

                    direction = config.protocolCtoS.CLOCKWISE;

                } else {

                    direction = config.protocolCtoS.ANTICLOCKWISE;
                }
			}

		} else {

			if ( start.y < end.y ) { // if from top to bottom

                if ( averageX < startEndX ) { // if clockwise or anticlockwise

                    direction = config.protocolCtoS.ANTICLOCKWISE;

                } else {

                    direction = config.protocolCtoS.CLOCKWISE;
                }

			} else {

                 if ( averageX > startEndX ) { // if clockwise or anticlockwise

                    direction = config.protocolCtoS.ANTICLOCKWISE;

                } else {

                    direction = config.protocolCtoS.CLOCKWISE;
                }
			}
		}

        if (direction === config.protocolCtoS.CLOCKWISE) {
            console.log("uhrzeiger");
        } else {
            console.log("gegen uhrzeiger");
        }
		this.send( direction );
	};



	Manager.prototype.heal = function(){

		this.send( config.protocolCtoS.HEAL );
        console.log("heal");
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
