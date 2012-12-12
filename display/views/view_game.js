(function(){

    display.views.game = (function(){


        var right = '<div id="qrcode"></div>';

        return {

            right: right
        };


    })();

    display.logic.game = function(){

        var $Screen = $('#Screen'),
            $StatusManager = $('#StatusManager');

        $Screen.toggleClass('hide show');
        $StatusManager.toggleClass('hide show');
    };

})();
