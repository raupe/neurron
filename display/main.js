(function(){

	if ( ! ('WebSocket' in window ) ) {

		var warning = document.getElementById('warning'),

			supportTouch = 'ontouchstart' in window,

			remove = function(){

				warning.className = 'warning hide';

				warning.removeEventListener( supportTouch ? 'touchend' : 'click', remove );
			};

		warning.className = 'warning';

		warning.addEventListener( supportTouch ? 'touchend' : 'click', remove );

		display.show('start');

	} else {

		var assetManager = display.AssetManager;

		assetManager.set( config.assets, function() {

			new display.Screen();

			new display.Manager();

			new display.Connection();

			display.show('start');
		});

		display.getAsset = assetManager.get;
	}

})();
