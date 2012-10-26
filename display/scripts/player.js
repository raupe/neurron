(function(){

	var Player = display.Player = function ( config ) {

		this.type = 'player';

		this.setup( config );

		this.register();
	};

    Player.prototype = new display.Element();


})();
