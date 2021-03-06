(function(){

	// assets handling
	var assetManager = display.AssetManager,

		path = location.pathname,
		scene = path.indexOf('/display/') > -1 ? path.substr(9, path.length ) : path;

	// check - default
	scene = display.views[scene] ? scene : 'start';
	if ( scene === 'contact' ) document.getElementById('site').textContent = 'play neurron';


	display.getAsset = assetManager.get;

	assetManager.set({ audio: { start: 'assets/views/start/start.ogg' }}, function(){

		display.show( scene );

		// connection warning
		if ( ! ('WebSocket' in window ) ) {

			var warning = document.getElementById('warning'),

				supportTouch = 'ontouchstart' in window,

				remove = function(){

					warning.className = 'warning hide';

					warning.removeEventListener( supportTouch ? 'touchend' : 'click', remove );
				};

			warning.className = 'warning';

			warning.addEventListener( supportTouch ? 'touchend' : 'click', remove );

		} else {

			assetManager.set( config.assets, function() {

				new display.Screen();

				new display.Manager();

				new display.Connection();
			});
		}
	});

})();
