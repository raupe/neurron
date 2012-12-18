(function(){

	var Player = display.Player = function ( params ) {

		this.type = 'player_' + params.id;

        this.velocity = config.player.velocity;

        this.visible = true;

        this.energy = 100;

        this.alive = true;

		this.init({

			id		: params.id,
			pos		: params.pos,
			color	: config.playerColors[ params.id ]
		});
	};

    Player.prototype = Object.create( display.Element.prototype );


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



    Player.prototype.fade = function(){

        this.spriteImages = this.assetManager.get('image', 'player_dead' );

        this.spriteCounter = 0;
    };

    Player.prototype.revive = function() {

        this.spriteImages = this.assetManager.get('image', this.type );

        this.spriteCounter = 0;

        this.alive = true;
        this.energy = 100;
    };


})();
