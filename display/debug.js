/* debug & testing */
(function(){


	var debug = (function(){

		function debug ( screen, action, connection ) {

			addPlayerInput( action );

			drawNums( screen );

			addVariableFrames( screen, action );

			activateTunnel( screen.background );
		}


		function activateTunnel ( tunnel ) {

			var active = true;

						tunnel.update = function(){

							this.change();

							this.draw();
						};


						tunnel.sequence('left');


			document.addEventListener('keyup', function ( e ) {

				var key = e.which;

				// show - 0
				if ( key === 48 ) {

					if ( !active ) {

						active = true;

						tunnel.update = function(){

							this.change();

							this.draw();
						};

					} else {

						active = false;

						tunnel.update =function(){};
					}
				}

				// moving - wasd
				if ( key === 65 ) tunnel.sequence('left');
				if ( key === 68 ) tunnel.sequence('right');
				if ( key === 87 ) tunnel.sequence('top');
				if ( key === 83 ) tunnel.sequence('bottom');
			});

		}


		function drawNums( screen ) {

			screen.grid.draw = function(){

				this.drawCircles();

				this.drawGrid();

				this.drawLines();


				this.origin.drawImage( this.ctx.canvas, this.posX, this.posY, this.width, this.height );
			};
		}


		function drawLine( screen, no ) {

			screen.grid.draw = function(){

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
		function addPlayerInput ( action ) {

			var players = action.players,
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
		function addVariableFrames ( screen, action ) {

			var players = action.players,
				grid = screen.grid,
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
