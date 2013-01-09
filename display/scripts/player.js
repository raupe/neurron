(function(){

	var Player = display.Player = function ( params ) {

		this.isPlayer = true;

		this.type = 'player_' + params.id;

		this.velocity = config.player.velocity;

		this.visible = true;

		this.alive = true;
		this.energy = 100;
		this.diffEnergy = 0;

        this.size = config.playerSize;
		this.color = config.playerColors[ params.id ];

		this.init({

			id      : params.id,
			pos     : params.pos
		});

		this.deadSprites = this.getAsset('image', 'player_dead' );
		this.transSprite = this.getAsset('image', 'player_trans' );
		this.reviveSound = this.getAsset('audio', 'revive' );
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



	Player.prototype.die = function(){

		this.spriteImages = this.deadSprites;
		this.spriteCounter = 0;

		this.alive = false;
	};


	Player.prototype.revive = function() {

		this.spriteImages = this.originSprites;
		this.spriteCounter = 0;

		if ( config.audio ) this.reviveSound.play();

		this.alive = true;
		this.energy = 100;
		this.diffEnergy = 100;

		this.animationStep = 2;
	};


	Player.prototype.fade = function() {

		var steps = 100,
			timer = 0,

			add = config.deadTime / steps,
			duration = add * 1000;

		function check(){

			timer += add;

			if ( !this.alive ) {

				if ( timer >= config.deadTime ) {

					this.revive();

				} else {

					if (
							timer > 0*add  && timer < 10*add || // 5 trans
							timer > 20*add && timer < 25*add ||

							timer > 40*add && timer < 44*add || // 4 trans
							timer > 48*add && timer < 52*add ||
							timer > 54*add && timer < 58*add ||
							timer > 62*add && timer < 66*add ||
							timer > 68*add && timer < 69*add ||

							timer > 70*add && timer < 72*add || // 2-3 trans
							timer > 73*add && timer < 76*add ||
							timer > 77*add && timer < 79*add ||
							timer > 80*add && timer < 82*add ||
							timer > 83*add && timer < 86*add ||
							timer > 87*add && timer < 89*add ||
							timer > 90*add && timer < 92*add ||
							timer > 93*add && timer < 96*add ||
							timer > 97*add && timer < 99*add
						) {

						this.src = this.transSprite;
						this.spriteImages = null;

					} else {

						this.spriteImages = this.deadSprites;
					}

					setTimeout( check.bind(this), duration );
				}

			}
		}

		setTimeout( check.bind(this), duration );
	};


})();
