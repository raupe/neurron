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

			this.grid.origin.drawImage( this.grid.ctx.canvas, this.grid.posX, this.grid.posY, this.grid.width, this.grid.height );
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

		var list, key;

		document.addEventListener('keyup', function ( e ) {

			e.preventDefault();

			e.stopPropagation();


			playerList = this.manager.playerList;

			key = e.which;

			if ( !playerList[0].moving ) {

				if ( key === 37 ) playerList[0].move( 4 );
				if ( key === 38 ) playerList[0].move( 5 );
				if ( key === 39 ) playerList[0].move( 3 );
				if ( key === 40 ) playerList[0].move( 6 );
			}
			// this.manager.handle( 5, [2,2,2] )
			if ( key === 49 ) {

				this.manager.create(2,1,42); // #1
				this.manager.create(3,2,27); // #2
				this.manager.create(5,3,38); // #3
			}

		}.bind(this));
	};

})();
