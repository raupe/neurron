/**
 * neurron
 * js for start.html
 */

$(document).ready(function(){

    var duration = {
        intro : 5000,
        how2play : 8000,
        demo : 9000
    };

    var $items = $(".screen_wrap li"),

        counter = 0,

        itemsLength = $items.length;


    //set time out
    var timeOut = function(){

        var currentId = $items[counter].id,

            durationTime = duration[currentId];
        $($items[counter]).fadeIn();
        setTimeout(function() {

           console.log(currentId +'  '+ durationTime);
            $($items[counter]).fadeOut();
            counter++;

           if( (counter) >= itemsLength) counter = 0;

            timeOut();

       }, durationTime);
    }

    timeOut();

});