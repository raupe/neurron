/**
 * neurron
 * js for start.html
 */

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
    }

    timeOut();



});