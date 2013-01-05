(function(){

    var assetManager = display.AssetManager;

    assetManager.set( config.assets, function() {

        new display.Screen();

        new display.Manager();

        new display.Connection();

        display.show( 'start' );
    });


    display.getAsset = assetManager.get;

})();
