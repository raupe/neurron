(function(){

    var Timer = display.Timer = function(milliseconds){

        this.time = 0;

        this.loop();
    }

    Timer.prototype.loop = function() {
        window.setTimeout(this.loop.bind(this), 1000);
//        console.log(this.time++);
    }
})();