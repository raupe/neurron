(function(){

	display.PlayerList = function ( players ) {

		var length = players.length,

			list = new Array( length );

		for ( var i = 0; i < length; i++ ) {

			list[i] = new display.Player( players[i] );
		}

		return list;
	};

})();
