(function(){

	var music;

	display.logic.game = function(){

		if ( !music ) {

			music = display.getAsset('audio', 'game');
			music.loop = true;
		}

		display.sound( music );
	};

})();
