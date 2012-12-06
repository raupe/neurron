(function(){

	var Player = display.Player = function ( params ) {

		this.type = 'player';

		this.visible = true; // default

		this.velocity = config.player.velocity;

		this.energy = 100;

        this.alive = true;

		this.init({

			id		: params.id,
			pos		: params.pos,
			color	: [ params.color.r, params.color.g, params.color.b ]
		});
	};

    Player.prototype = new display.Element();


    // check: clockwise <- antiRing, anticlockwise -> ring
    Player.prototype.setDir = function() {

        var nextPos = this.nextPos;

        if ( nextPos > this.pos ) {

            this.dir = ( nextPos - this.pos) < this.grid.lanes/2 ? 'antiRing' : 'ring';

        } else {

            this.dir = ( this.pos - nextPos ) > this.grid.lanes/2 ? 'antiRing' : 'ring';
        }
    };



    Player.prototype.change = function(){

        if ( this.dir === 'ring' ) { // visual: antiring....

            if ( this.pos%this.grid.lanes === 0 ) {

                this.pos += (this.grid.lanes - 1);

            } else {

                this.pos--;
            }

        } else {

            if ( this.pos%this.grid.lanes === this.grid.lanes - 1 ) {

                this.pos -= (this.grid.lanes - 1);

            } else {

                this.pos++;
            }
        }

        if ( this.pos !== this.nextPos ) {

            this.setDir();

        } else {

            this.moving = false;
        }
    };


})();
