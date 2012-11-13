(function(){

	var Manager = controller.Manager = function ( config ) {

		this.req = new XMLHttpRequest();
		this.url = config.url;

		this.id = 0; // defaults
		this.channel = config.channel;

		this.register();

		controller.Input.prototype.manager = this;
	};


	Manager.prototype.register = function(){

		/* serve response  */
		this.req.onload = function ( t ) {

			// console.log(t);
			var res = t.currentTarget.responseText;

				msg = atob( res.substr( 0, res.length -1 ) );

			// results
			this.id = msg.charCodeAt( 0 );
			this.color = msg.charCodeAt( 1 );
		};

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

                direction = 4;//links

            } else {

                direction = 3;//rechts
            }

        } else {

            if ( start.y > end.y ) {

                direction = 5;//hoch

            } else {

                direction = 6;//unten
            }
        }


        this.send( direction );
	};


	Manager.prototype.send = function ( Manager )  {

		this.req.open( 'POST', this.url , true );

		// encode into base64, avoiding special characters like '0'
		var data = btoa( String.fromCharCode(  this.channel, this.id, Manager ) );

		this.req.setRequestHeader( 'Content-Type', 'text/plain; charset=UTF-8' );

		this.req.send( data );
	};


})();
