(function(){
/*
	display.views.load = (function(){

		var left = '<img src="assets/views/load/load_background.jpg"/>',



            right = 'right';


        return {

            left    : left,
            right   : right
        };

	})();
*/
    display.load_view.playerNums = 0;

    display.load_view.showNewPlayer = function(){
        console.log("new player added");
        display.load_view.playerNums++;

        var element = document.getElementById("load_register_status");

    };

    display.load_view.showNewPlayer();
    console.log(display.load_view.playerNums);

    display.logic.load = function(){

//        display.show( 'game' );
    };

})();
