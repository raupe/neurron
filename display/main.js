(function(){

    var main = function() {

		new display.Screen();

		new display.Manager();

		new display.Connection();
	};

	// loading assets
    new display.AssetManager( config.assets, main );

})();


// /* debug */
// debug( screen, grid, manager, connection );
