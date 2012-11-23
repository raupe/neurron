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
		// this.manager.handle( 6, [ 1, 1, 15 ]);
		document.addEventListener('keyup', function ( e ) {

			e.preventDefault();

			e.stopPropagation();


			playerList = this.manager.playerList;

			key = e.which;

			if ( key === 49 )  this.manager.handle( 4, [ 1,  2 ]);		// 1
			if ( key === 50 )  this.manager.handle( 4, [ 1,  3 ]);		// 2

			if ( key === 51 )  this.manager.handle( 6, [ 1, 1, 15 ]);	// 3
            if ( key === 52 )  this.manager.handle( config.protocol.COLLISION, [ 1, [1] ]);	// 4



		}.bind(this));
	};

})();
