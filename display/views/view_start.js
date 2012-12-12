(function(){

	display.views.start = (function(){

		var left = '\
        \
        <div class="slider_content_wrap">\
            <div class="logo">neurron</div>\
            <div class="slider_box_wrap">\
                <div class="button gradient intro_button"><p>intro</p></div>\
                <div class="button gradient play_button"><p>how2play</p></div>\
                <div class="button gradient demo_button"><p>demo</p></div>\
                <div class="dashboard round"></div>\
                <ul class="screen_wrap round">\
                    <li id="intro" class="screen js_screen"></li>\
                    <li id="how2play" class="screen js_screen"></li>\
                    <li id="demo" class="screen js_screen"></li>\
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

            var autoSlide = true;

            var duration = {
                intro : 700,
                how2play : 500,
                demo : 600
            };

            //caroussel auto slider
            var caroussel = function(){

                // var items = $(".screen_wrap li").length;

                // console.log( $("li").get(1).attr('id') );

                display.show( 'load' );


                /*while(autoSlide){

                    setTimeout(function() {


                    }, 1);

                }*/
            };

            caroussel();
        });

    };




})();
