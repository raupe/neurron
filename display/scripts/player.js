(function(){

	var Player = display.Player = function ( config ) {

		this.type = 'player';

		this.size = 40;


		this.init({

			id: config.id,
			pos: config.pos,
			color: [ config.color * 1, config.color * 2, config.color * 3 ]

		});
	};

    Player.prototype = new display.Element();


})();
