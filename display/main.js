(function(){

	// assets handling
	var assetManager = display.AssetManager;

	display.getAsset = assetManager.get;


	assetManager.set({ audio: { start: 'assets/views/start/start.mp3' }}, function(){

		display.show('start');

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

document.getElementById("contact").addEventListener("click", function(){

    $('.contact').fadeOut(1000);
    $('.neurron').fadeIn(1000);

    display.show('contact');

    $('#qr_code').removeClass("fadeIn");
    $('#qr_code').addClass("fadeOut");
});

document.getElementById("neurron").addEventListener("click", function(){

    $('.neurron').fadeOut(1000);
    $('.contact').fadeIn(1000);

    display.show('start');

    // I put the expected fadeIn Code for #qr_code into the start logic because it starts somehow very late
});