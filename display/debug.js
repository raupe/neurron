/* debug & testing */
(function(){


	var debug = (function(){

		function debug ( screen, grid, manager, connection ) {

			addPlayerInput( manager );

			drawNums( grid );

			addVariableFrames( grid, manager );

		}


		function drawNums( grid ) {

			grid.draw = function(){

				this.drawCircles();

				this.drawGrid();

				this.drawLines();


				this.origin.drawImage( this.ctx.canvas, this.posX, this.posY, this.width, this.height );
			};
		}


		function drawLine( grid, no ) {

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

		}



		// simulate player input
		function addPlayerInput ( manager ) {

			var players = manager.players,
				key;

			document.addEventListener('keyup', function ( e ){

				e.preventDefault();
				e.stopPropagation();

				key = e.which;

				if ( !players[0].moving ) {

					if ( key === 37 ) players[0].move( 4 );
					if ( key === 38 ) players[0].move( 5 );
					if ( key === 39 ) players[0].move( 3 );
					if ( key === 40 ) players[0].move( 6 );
				}

			});
		}


		// change framestep between fields, lower framerate - *faster* animation
		function addVariableFrames ( grid, manager ) {

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
		}


		return debug;

	})();




	window.debug = debug;

})();
