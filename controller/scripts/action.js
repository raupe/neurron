(function(){

	var Action = controller.Action = function( config ) {

		this.req = new XMLHttpRequest();
		this.url = config.url;
	};


	Action.prototype.send = function( data ){

		this.req.open('POST', this.url, true );

		this.req.send( data );
	};



})();
