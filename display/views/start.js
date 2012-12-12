/**
 * neurron
 * js for start.html
 */

$(document).ready(function(){

    var duration = {
        intro : 700,
        how2play : 300,
        demo : 100
    };

    var $items = $(".screen_wrap li"),

        counter = 0,

        itemsLength = $items.length;


    //set time out
    var timeOut = function(){

        var currentId = $items[counter].id,

            durationTime = duration[currentId];

        setTimeout(function() {

           console.log(currentId +'  '+ durationTime);

            counter++;

           if( (counter) >= itemsLength) counter = 0;

            timeOut();

       }, durationTime);
    }

    timeOut();

});