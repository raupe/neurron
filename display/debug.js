/* debug & testing */
(function(){


	var Debug = display.Debug = function(){

		this.addPlayerInput();

		this.drawNums();

		// this.addVariableFrames( grid, manager );
	};



	Debug.prototype.drawNums = function() {

		this.background.draw = function(){

			this.grid.drawCircles();

			this.grid.drawGrid();

			this.grid.drawLines();

			this.grid.origin.drawImage( this.grid.ctx.canvas, this.grid.posX, this.grid.posY, this.grid.width, this.grid.height );
		};
	};


	Debug.prototype.drawLine = function ( grid, no ) {

		grid.draw = function(){

			var fields = screen.grid.fields,

				ctx = screen.grid.ctx;

			var a = no;

			fields[a].ring.forEach(function ( field ) {

				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});

			fields[a].antiRing.forEach(function ( field) {
				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});

			fields[a].dist.forEach(function ( field) {
				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});

			fields[a].antiDist.forEach(function ( field) {
				ctx.fillRect( field.x-2.5,field.y-2.5,5,5);
			});
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


		// change framestep between fields, lower framerate - *faster* animation
	Debug.prototype.addVariableFrames = function ( grid, manager ) {

		var players = manager.players,
			keymap = {},
			key;

		for ( key = 48 ; key < 57; key++ ) {

			keymap[key]= key - 48;
		}

		document.addEventListener('keyup', function ( e ){

			e.preventDefault();
			e.stopPropagation();

			key = e.which;

			if ( !players[0].moving && keymap[key] ) {

				grid.frames = keymap[key] * 5; // default: 6 * 5
				grid.definePositions.call( grid );

				players[0].moving = true;

				setTimeout( function(){	players[0].moving = false;	});
			}
		});
	};

})();
