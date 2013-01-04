(function(){

    var $container = $('#container'),
        $body = $(document.body);

	display.views.load = (function(){

		var left = '\
        <div id="load_outerwrapper" class="load_outerwrapper">\
                    <div id="load_innerwrapper" class="load_innerwrapper">\
                        <div id="load_teamname" class="load_teamname"></div>\
                        <img id="load_bar" src="assets/views/load/load.gif"/>\
                        <div class="load_background_wrapper">\
                            <img class="load_background" src="assets/views/load/load_background.jpg"/>\
                        </div>\
                        <div id="progressbar" class="progressbar"></div>\
                    </div>\
                </div>\
                ',

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
            load_teamname = document.getElementById('load_teamname');

        // remove images
        document.getElementById('load_register_status').innerHTML = '';

        loadBar.className = ''; // show loadBar
        load_teamname.removeChild( document.getElementById('load_greet') ); // remove Team greeting

        $('#container').addClass("backgroundImage");
        $('#container-right').removeClass("marginTopPadding");
        $('#qr_code img').removeClass("halfQR");
    };

    display.load_view.hideLoadBar = function() {

        document.getElementById('load_bar').className = 'load_hide';
    };

    display.load_view.greetTeam = function() {

        var element = document.getElementById('load_teamname'),
            greetBox = document.createElement('span');

        greetBox.id = 'load_greet';
        greetBox.className = 'greetings';
// 'Team ' +  ''Neurrons';
        greetBox.innerHTML = 'Hi ' + ( display.teamname ? 'Team ' + display.teamname : 'Neurrons' );
        element.appendChild(greetBox);
    };

    display.load_view.loadBar = function(seconds) {
        var progressbar = $('#progressbar');
        progressbar.animate({
            width: "100%"
        }, 15000, function(){
            console.log("complete");
        });
    }

    display.logic.load = function(){

        $('#container').removeClass("backgroundImage");
        $('#container-right').addClass("marginTopPadding");
        $('#qr_code img').addClass("halfQR");

    };

})();
