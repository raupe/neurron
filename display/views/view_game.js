(function(){

    display.logic.game = function(){

        var $Screen = $('#Screen'),
            $StatusManager = $('#StatusManager');

        $Screen.toggleClass('hide show');
        $StatusManager.toggleClass('hide show');
    };

})();
