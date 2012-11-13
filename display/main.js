(function(){

	// loading assets
    var manager = new display.AssetManager( config.assets );


    manager.on('progress', function ( e ) {

		// console.log(e.progress);
    });




    manager.on('load', function(){

        // console.log(manager.assets);

        new display.Screen();

        new display.Manager();

        new display.Connection();
    });

})();
