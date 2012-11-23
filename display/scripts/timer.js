(function(){

    var Timer = display.Timer = function(milliseconds){

        this.timeLeft = milliseconds;

        this.timeLeftString = "";

        this.loop();
    }

    Timer.prototype.loop = function() {

        this.timeLeft-=1000; // subtract 1 second

        this.setTimeLeftString();
        this.displayTimeLeft();

        if (this.timeLeft >= 1000 ) { // just call loop if timeLeft is greater than 1 second

            window.setTimeout(this.loop.bind(this), 1000);
        }
    }

    Timer.prototype.setTimeLeftString = function() {

        var min = ~~((this.timeLeft/1000) / 60);
        var seconds = ~~(this.timeLeft/1000) - (min * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        this.timeLeftString = "0" + min + ":" + seconds;
    }

    Timer.prototype.displayTimeLeft = function() {

        var timerContainer = document.getElementById("timer");

        if (!timerContainer) {

            timerContainer = document.createElement('div');
            timerContainer.setAttribute("id", "timer");
            timerContainer.setAttribute("class", "timer");
            timerContainer.innerHTML = this.timeLeftString;

            document.body.appendChild( timerContainer );
        } else {

            timerContainer.innerHTML = this.timeLeftString;
        }
    }
})();

// todo: cleartimeout