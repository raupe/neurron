(function(){

    var $Screen = $('#Screen'),
        $StatusManager = $('#StatusManager');

    display.logic.game = function(){


        $Screen.toggleClass('hide show');
        $StatusManager.toggleClass('hide show');
    };

})();
