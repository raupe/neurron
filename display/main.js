(function(){


    new display.Debug();



    // available scenes - default / current scene - fetch sites , parse , then callback what to do
    new display.Scenemanager({

        start : 'views/start',
        load  : 'views/load',
        game  : 'views/game',
        end   : 'views/end'

    }, function ( scene ) { // reference to this - as a single scene !

        scene.show('start');


        // console.log(scene);
        // document.addEventListener('click', function(){

        //     scene.show('load');
        //     //scene.changeTo('load');//, function() { // show + transition , optional paramter as a callback

        // });



        // // loading assets
        // var manager = new display.AssetManager( config.assets );


        // manager.on('progress', function ( e ) {

        //     // console.log(e.progress);
        // });




        // manager.on('load', function(){

        //     // console.log(manager.assets);

        //     new display.Screen();

        //     new display.Manager();

        //     new display.Connection();
        // });


        // });

        // scenemanager.on('load', function(){  });

        // scenemanager.on('game', function(){});


    });






})();
