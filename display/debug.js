/* debug & testing */
(function(){


	var Debug = display.Debug = function(){

		this.addPlayerInput();

		this.drawNums();

		// this.drawLine( 8 );
	};



	Debug.prototype.drawNums = function() {

		this.background.draw = function(){

			this.grid.drawCircles();

			this.grid.drawGrid();

			this.grid.drawLines();

			this.grid.origin.drawImage( this.grid.ctx.canvas,
										this.grid.posX,
										this.grid.posY,
										this.grid.width,
										this.grid.height );
		};
	};


	Debug.prototype.drawLine = function ( id ) {

		this.background.draw = function(){

			var fields = this.grid.fields,

				ctx = this.grid.ctx;

			fields[ id ].ring.forEach(function ( field ) {

				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});

			fields[ id ].antiRing.forEach(function ( field) {
				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});

			fields[ id ].dist.forEach(function ( field) {
				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});

			fields[ id ].antiDist.forEach(function ( field) {
				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});

			this.grid.origin.drawImage( this.grid.ctx.canvas, this.grid.posX, this.grid.posY, this.grid.width, this.grid.height );
		};

	};



	// simulate player input
	Debug.prototype.addPlayerInput = function() {

		var list, key, ref,

			active = false;

		document.addEventListener('keyup', function ( e ) {

			e.preventDefault();

			e.stopPropagation();


			playerList = this.manager.playerList;

			key = e.which;

			if ( !playerList[0].moving ) {


				if ( key === 37 ) { // left

                    this.manager.handle( 6, [2,1,42] );
                    this.manager.handle( 7, [2, [2]]);
                }

				// if ( key === 38 ) playerList[0].move( 5 );
				if ( key === 39 ) playerList[0].move( 14 );
				// if ( key === 40 ) playerList[0].move( 6 );
			}

			if ( key === 49 ) { // 1

				this.manager.handle( 6, [1,3,42] );
                this.manager.handle( 7, [1, [2]]);

			}

			if ( key === 50 ) {

				this.manager.handle( 6, [ 1,1,42] );
				this.manager.handle( 6, [ 2,2,27] );
				this.manager.handle( 6, [ 3,3,38] );

				this.manager.handle( 6, [ 4,1,30] );
				this.manager.handle( 6, [ 5,2,31] );
				this.manager.handle( 6, [ 6,3,32] );
				this.manager.handle( 6, [ 7,1,33] );
				this.manager.handle( 6, [ 8,2,34] );
				this.manager.handle( 6, [ 9,3,35] );
				this.manager.handle( 6, [10,1,36] );
				this.manager.handle( 6, [11,2,37] );
				this.manager.handle( 6, [12,3,38] );
				this.manager.handle( 6, [13,1,39] );
				this.manager.handle( 6, [14,2,40] );
				this.manager.handle( 6, [14,3,41] );


				this.manager.handle( 6, [15,1,44] );
				this.manager.handle( 6, [16,2,45] );
				this.manager.handle( 6, [17,3,46] );
				this.manager.handle( 6, [18,1,48] );
				this.manager.handle( 6, [19,2,49] );
				this.manager.handle( 6, [20,3,50] );
			}

			if ( key === 51 ) {

				if ( active ) {

					clearInterval( ref );

					active = false;

				} else {

					active = true;

					this.manager.handle( 6, [ 1,1,42] );
					this.manager.handle( 6, [ 2,2,27] );
					this.manager.handle( 6, [ 3,3,38] );
					this.manager.handle( 6, [ 4,1,30] );
					this.manager.handle( 6, [ 5,2,31] );
					this.manager.handle( 6, [ 6,3,32] );
					this.manager.handle( 6, [ 7,1,33] );
					this.manager.handle( 6, [ 8,2,34] );
					this.manager.handle( 6, [ 9,3,35] );
					this.manager.handle( 6, [10,1,36] );
					this.manager.handle( 6, [11,2,37] );
					this.manager.handle( 6, [12,3,38] );
					this.manager.handle( 6, [13,1,39] );
					this.manager.handle( 6, [14,2,40] );
					this.manager.handle( 6, [15,3,41] );
					this.manager.handle( 6, [16,1,44] );
					this.manager.handle( 6, [17,2,45] );
					this.manager.handle( 6, [18,3,46] );
					this.manager.handle( 6, [19,1,48] );
					this.manager.handle( 6, [20,2,49] );
					this.manager.handle( 6, [21,3,50] );

					ref = setInterval(function(){

						this.manager.handle( 6, [ 1,1,42] );
						this.manager.handle( 6, [ 2,2,27] );
						this.manager.handle( 6, [ 3,3,38] );
						this.manager.handle( 6, [ 5,2,31] );
						this.manager.handle( 6, [ 6,3,32] );
						this.manager.handle( 6, [ 8,2,34] );
						this.manager.handle( 6, [ 9,3,35] );
						this.manager.handle( 6, [10,2,37] );
						this.manager.handle( 6, [11,3,38] );
						this.manager.handle( 6, [12,2,40] );
						this.manager.handle( 6, [13,1,41] );

					}.bind(this), 2000);
				}
			}

		}.bind(this));
	};

})();
