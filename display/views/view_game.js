(function(){

	var $Screen = $('#Screen'),
		$StatusManager = $('#StatusManager'),
		music;

	display.logic.game = function(){

		if ( !music ) {

			music = display.getAsset('audio', 'game');
			music.loop = true;
		}

		display.sound( music );

		$Screen.toggleClass('hide show');
		$StatusManager.toggleClass('hide show');
	};

})();
