/**
 * neurron
 * js for start.html
 */

$(document).ready(function(){

    var autoSlide = true;

    var duration = {
        intro : 700,
        how2play : 500,
        demo : 600
    };

    //caroussel auto slider
    var caroussel = function(){

        var items = $(".screen_wrap li").length;

        console.log( $("li").get(1).attr('id') );

        /*while(autoSlide){

            setTimeout(function() {


            }, 1);

        }*/
    }

    caroussel();
});