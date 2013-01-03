(function(){

    var $container = $('#container'),
        $body = $(document.body);

	display.views.load = (function(){

		var left = '\
        <div class="load_background_wrapper">\
            <img class="load_background" src="assets/views/load/load_background.jpg"/>\
        </div>\
        <div id="load_countdown_timer">\
            <img id="load_bar" src="assets/views/load/load.gif"/>\
        </div>',

        right = '<div id="load_register_status" class="joined round"></div>';

        return {

            left    : left,
            right   : right
        };

	})();

    display.load_view.playerNums = 0;

    display.load_view.showNewPlayer = function(){

        // console.log("new player added");
        display.load_view.playerNums++;

        var element = document.getElementById('load_register_status'),
            pathToImages = config.viewAssets + '/load/',
            image = new Image();

        image.onload = function(){ element.appendChild(image); };
        image.src = pathToImages + 'ronron' + display.load_view.playerNums + '.png';
    };

    display.load_view.clearLoadScene = function(){

        display.load_view.playerNums = 0;

        var loadBar = document.getElementById('load_bar'),
            load_countdown_timer = document.getElementById('load_countdown_timer');

        // remove images
        document.getElementById('load_register_status').innerHTML = '';

        loadBar.className = ''; // show loadBar
        load_countdown_timer.removeChild( document.getElementById('load_greet') ); // remove Team greeting

        $('#container').addClass("backgroundImage");
    };

    display.load_view.hideLoadBar = function() {

        document.getElementById('load_bar').className = 'load_hide';
    };

    display.load_view.greetTeam = function() {

        var element = document.getElementById('load_countdown_timer'),
            greetBox = document.createElement('span');

        greetBox.id = 'load_greet';
        greetBox.className = 'greetings';
// 'Team ' +  ''Neurrons';
        greetBox.innerHTML = 'Hi ' + ( display.teamname ? 'Team ' + display.teamname : 'Neurrons' );
        element.appendChild(greetBox);
    };

    display.logic.load = function(){

        $('#container').removeClass("backgroundImage");

//        $container.addClass('bg-black');
//        $body.addClass('bg-black');
    };

})();
