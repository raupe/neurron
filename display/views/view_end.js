(function(){

	display.views.end = (function(){

		var left = '\
		<div class="main_content_wrap">\
            <div class="logo">neurron</div>\
            <div id="score_wrap" class="score_wrap">\
                <div class="score_item">\
                    <h2>high score</h2>\
                    <div id="score_value" class="score_value box">\
                        <h1>12000</h1>\
                    </div>\
                </div>\
                <div class="score_item">\
                    <h2>team score</h2>\
                    <div id="diagram" class="diagram box">\
                        <ul>\
                            <li class="blue"></li>\
                            <li class="orange"></li>\
                            <li class="green"></li>\
                            <li class="red "></li>\
                            <li class="yellow"></li>\
                            <li class="lila"></li>\
                            <li class="turkey"></li>\
                            <li class="pink"></li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="score_item">\
                    <h2>league of legends</h2>\
                    <div id="legends" class="legends box">\
                        <table border="0" width="100%" cellpadding="3" cellspacing="0">\
                            <tr>\
                                <td>01</td>\
                                <td>Team Raupe</td>\
                                <td>12000</td>\
                            </tr>\
                            <tr>\
                                <td>02</td>\
                                <td>Marzi Team</td>\
                                <td>2000</td>\
                            </tr>\
                            <tr>\
                                <td>03</td>\
                                <td>Gang of Four</td>\
                                <td>175</td>\
                            </tr>\
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

    display.logic.end = function(){};

})();
