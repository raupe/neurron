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
        var element = document.getElementById("load_bar");
            element.className -= "load_hide";
    };

    display.load_view.hideLoadBar = function() {
        var element = document.getElementById("load_bar");
            element.className += "load_hide";
    };

    display.load_view.greetTeam = function() {
        var element = document.getElementById("load_countdown_timer"),
            greetBox = document.createElement("span");

        greetBox.innerHTML = "Hi Neurrons";
        element.appendChild(greetBox);
    };

    display.logic.load = function(){

    }

})();
