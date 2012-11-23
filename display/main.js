(function(){

    var assetManager = display.AssetManager;

    assetManager.set( config.assets, function() {

        // console.log(assets);

        new display.Screen();

        new display.Manager();

        new display.Connection();
    });


    assetManager.on( 'progress', function ( e ) {

        // console.log(e.progress);
    });



    display.Element.prototype.assetManager = assetManager;
    display.Background.prototype.assetManager = assetManager;

})();
