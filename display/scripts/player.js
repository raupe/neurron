(function(){

	var Player = display.Player = function ( config ) {

		this.type = 'player';

		this.visible = true; // default

		this.velocity = 1;

		this.energy = 100;

		this.init({

			id: config.id,
			pos: config.pos,
			color: [ config.color.r, config.color.g, config.color.b ]
		});
	};

    Player.prototype = new display.Element();

})();
