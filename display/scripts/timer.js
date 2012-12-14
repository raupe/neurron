(function(){

    var Timer = display.Timer = function ( milliseconds, type , appendTo){

        this.timeLeft = milliseconds;
        this.type = type;
        this.timeLeftString = "";
        this.appendTo = document.getElementById(appendTo);

        if (!appendTo) this.appendTo = document.body; // if 3rd arguement is not passing, body is default to append

        this.loop();
    };

    Timer.prototype.loop = function() {

        this.timeLeft-=1000; // subtract 1 second

        this.setTimeLeftString();
        this.displayTimeLeft();

        if (this.timeLeft >= 1000 ) { // just call loop if timeLeft is greater than 1 second

            window.setTimeout(this.loop.bind(this), 1000);

        } else {

            var timerContainer = document.getElementById(this.type);
//            this.appendTo.removeChild(timerContainer);
        }
    };

    Timer.prototype.setTimeLeftString = function() {

        var min = ~~((this.timeLeft/1000) / 60);
        var seconds = ~~(this.timeLeft/1000) - (min * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        this.timeLeftString = "0" + min + ":" + seconds;
    };

    Timer.prototype.displayTimeLeft = function() {

        var timerContainer = document.getElementById(this.type);

        if (!timerContainer) {

            timerContainer = document.createElement('div');
            timerContainer.id = this.type;
            timerContainer.className = this.type;
            timerContainer.innerHTML = this.timeLeftString;

            this.appendTo.appendChild( timerContainer );

        } else {

            timerContainer.innerHTML = this.timeLeftString;
        }
    };

})();
