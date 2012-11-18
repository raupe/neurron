(function(){

    var manager = display.AssetManager;

    manager.set( config.assets, function() {

        // console.log(assets);

        new display.Screen();

        new display.Manager();

        new display.Connection();
    });


    manager.on( 'progress', function ( e ) {

        // console.log(e.progress);
    });



    display.Element.prototype.assetManager = manager;
    display.Background.prototype.assetManager = manager;

})();
