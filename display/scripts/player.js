(function(){

	var Player = display.Player = function ( config ) {

		this.type = 'player';

		config.color = [ 50, 100, 20 ];

		this.init( config );
	};

    Player.prototype = new display.Element();


})();
