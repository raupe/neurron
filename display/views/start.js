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
    var timeOut = function( item, counter, duration){

        var itemCounter = counter,

            currentItem = $(item).attr('id'),

            durationTime = duration[currentItem];

        setTimeout(function() {

           console.log(currentItem +'  '+ durationTime);

           if( (++itemCounter) < itemsLength){

               timeOut($items[itemCounter], itemCounter, duration);
           }else{
               itemCounter = 0;
               timeOut($items[0],itemCounter, duration);
           }
       }, durationTime);
    }

    timeOut($items[0], counter, duration);

});