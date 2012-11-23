(function(){

    var Timer = display.Timer = function(milliseconds){

        this.timeLeft = milliseconds;

        this.loop();
    }

    Timer.prototype.loop = function() {
        this.timeLeft-=1000;

        var min = ~~((this.timeLeft/1000) / 60);
        var seconds = ~~(this.timeLeft/1000) - (min * 60);
        console.log(min+":"+seconds);


        if (this.timeLeft >= 1000 ) {

            window.setTimeout(this.loop.bind(this), 1000);
        }
    }
})();

// todo: cleartimeout