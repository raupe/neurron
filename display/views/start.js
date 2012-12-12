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

    var items = $(".screen_wrap li"),

        itemsLength = items.length;

    //set time out
    var timeOut = function( itemList, itemsLength, duration){

        var currentLength = itemsLength,

            currentItem = $(itemList).attr('id');
            durationTime = duration[currentItem];

        setTimeout(function() {

            console.log($(itemList).attr('id') +'  '+ duration[currentItem]);

            if( (currentLength-1) > 0){

                timeOut($(itemList).next(), (currentLength-1), duration);
            }else{
                var itemsReset = items;
                    itemsLength = itemsReset.length;

                timeOut($(itemsReset)[0], itemsLength, duration);
            }
        }, durationTime);
    }

    timeOut($(items[0]), itemsLength, duration);

});