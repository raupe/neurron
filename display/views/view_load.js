(function(){

	display.views.load = (function(){

		var left = '<div class="load_background_wrapper">\
                    <img class="load_background" src="assets/views/load/load_background.jpg"/>\
                </div>\
                <div id="load_countdown_timer">\
                    <img id="load_bar" src="assets/views/load/load.gif"/>\
                </div>',



            right = '<div id="load_register_status">\
                </div>';


        return {

            left    : left,
            right   : right
        };

	})();

    display.load_view.playerNums = 0;

    display.load_view.showNewPlayer = function(){
        console.log("new player added");
        display.load_view.playerNums++;

        var element = document.getElementById("load_register_status"),
            image = document.createElement("img"),
            pathToImages = "http://localhost/projects/neurron/display/assets/tmp/"; // TODO: adapt path to small neurron icons
            image.src = pathToImages + "ronron" +display.load_view.playerNums+ ".png"; // TODO: adapt name of neurron image
            element.appendChild(image);
    };

    display.load_view.clearLoadScene = function(){
        display.load_view.playerNums = 0;
        var loadBar = document.getElementById("load_bar"),
            load_countdown_timer = document.getElementById("load_countdown_timer");

        loadBar.className -= "load_hide"; // show loadBar
        load_countdown_timer.removeChild(document.getElementById("load_greet")); // remove Team greeting
    };

    display.load_view.hideLoadBar = function() {
        var element = document.getElementById("load_bar");
            element.className += "load_hide";
    };

    display.load_view.greetTeam = function() {
        var element = document.getElementById("load_countdown_timer"),
            greetBox = document.createElement("span");
            greetBox.id = "load_greet";

        greetBox.innerHTML = "Hi " + display.teamname + "Neurrons"; // TODO: modify with config.teamname or something like that
        element.appendChild(greetBox);
    };

    display.logic.load = function(){};

})();
