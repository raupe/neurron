(function(){

	display.PlayerList = function ( players ) {

		var length = players.length-1,

			list = new Array( length );

		for ( var i = 0; i < length; i++ ) {

			list[i] = new display.Players( players[i] );
		}

		return list;
	};

})();
