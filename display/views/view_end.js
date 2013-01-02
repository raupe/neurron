(function(){

    var $container = $('#container'),
        $body = $(document.body);

	display.views.end = (function(){

		var left = '\
		<div class="main_content_wrap">\
            <div class="logo">\
                <img src="style/images/neurron_logo.png" width="356" height="113" alt="neurron logo" />\
                <div class="subtitle">END OF THE TUNNEL</div>\
            </div>\
            <div id="score_wrap" class="score_wrap">\
                <div class="score_item">\
                    <h2>high score</h2>\
                    <div id="score_value" class="score_value box">\
                        <h1></h1>\
                    </div>\
                </div>\
                <div class="score_item">\
                    <h2>team score</h2>\
                    <div id="diagram" class="diagram box">\
                        <ul>\
                            <li class="red "></li>\
                            <li class="blue"></li>\
                            <li class="green"></li>\
                            <li class="yellow"></li>\
                            <li class="lila"></li>\
                            <li class="orange"></li>\
                            <li class="turkey"></li>\
                            <li class="pink"></li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="score_item">\
                    <h2>league of legends</h2>\
                    <div id="legends" class="legends box">\
                        <table border="0" width="100%" cellpadding="3" cellspacing="0">\
                        </table>\
                    </div>\
                </div>\
            </div>\
        </div>\
		\
		',


		right = '\
		\
		';


		return {

            left    : left,
            right   : right
        };

	})();

    display.logic.end = function(){

        $container.removeClass('bg-black');
        $body.removeClass('bg-black');
    };

})();
