(function(){

	var Player = display.Player = function ( params ) {

		this.type = 'player';

		this.visible = true; // default

		this.velocity = 1;

		this.energy = 100;

		this.init({

			id: params.id,
			pos: params.pos,
			color: [ params.color.r, params.color.g, params.color.b ]
		});
	};

    Player.prototype = new display.Element();

})();
