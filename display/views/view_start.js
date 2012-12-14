(function(){

	display.views.start = (function(){

		var left = '\
        <div class="slider_content_wrap">\
            <div class="logo">neurron</div>\
            <div class="slider_box_wrap">\
                <ul>\
                    <li id="intro_button"class="button button_color intro_button"><p>intro</p></li>\
                    <li id="play_button" class="button button_color play_button"><p>how2play</p></li>\
                    <li id="demo_button" class="button button_color demo_button"><p>demo</p></li>\
                </ul>\
                <div class="dashboard round"></div>\
                \
                <ul class="screen_wrap round">\
                    <li id="intro" class="screen js_screen">\
                        <!--<iframe class="video" src="http://www.youtube.com/embed/ogTIl-xzDRI" frameborder="0" allowfullscreen></iframe>-->\
                        <img class="video"  src="http://www.browserhits.de/screenshots/original/2011/09/league_of_legends_05.jpg" />\
                    </li>\
                    <li id="how2play" class="screen js_screen">\
                        <img class="video"  src="http://company.zynga.com/nfs/files-0925-01/coasterville_flat_0.png" />\
                    </li>\
                    <li id="demo" class="screen js_screen">\
                        <img class="video"  src="http://www.pc-games-blog.net/wp-content/uploads/2012/10/League_of_Legends_lan-600x351.jpg" />\
                    </li>\
                </ul>\
            </div>\
        </div>\
        \
		',

		right = '\
            <div class="comic round"></div>\
            <div class="qr_code round"></div>\
            <div class="joined round"></div>\
		\
		';


        return {

            left    : left,
            right   : right
        };

	})();


    display.logic.start = function(){

        $(document).ready(function(){

            var duration = {
                intro : 4000,
                how2play : 4000,
                demo : 4000
            };

            var $items = $(".screen_wrap li"),

                $buttons = $(".slider_box_wrap li"),

                timer = 0;

                counter = 0,

                itemsLength = $items.length;

            $($buttons).click(function(){

                $($buttons[counter]).removeClass('button_active');
                $($items[counter]).fadeOut();
                counter = $(this).index();
                clearTimeout(timer);
                timeOut();

            });
            //set time out
            var timeOut = function(){

                var currentId = $items[counter].id,

                    durationTime = duration[currentId];

                $($items[counter]).fadeIn();
                $($buttons[counter]).addClass('button_active');
                //$buttons[counter].className += " button_active";

                timer = setTimeout(function() {

                   //console.log(currentId +'  '+ durationTime);
                    $($items[counter]).fadeOut();
                    $($buttons[counter]).removeClass('button_active');
                    //$buttons[counter].className += " button_active";
                    counter++;

                   if( (counter) >= itemsLength) counter = 0;

                    timeOut();

               }, durationTime);
            };

            timeOut();
        });

    };



})();
