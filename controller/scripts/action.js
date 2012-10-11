(function(){

	var Action = controller.Action = function( config ) {

		this.req = new XMLHttpRequest();
		this.url = config.url;
		this.channel = config.channel;

		this.register();
	};


	Action.prototype.register = function(){

		/* serve response  */
		this.req.onload = function ( t ) {

			var res = t.responseText;

			console.log('error', t);
			// this.controllerId = t.id;
			// this.color = 'blue';
		};

		/* on remove */
		this.onbeforeunload = function(){

		};

		this.send( this.channel + 0 );
	};


	Action.prototype.send = function ( data, check ) {

		this.req.open('POST', this.url, true );

		this.req.send( data );
	};



})();
