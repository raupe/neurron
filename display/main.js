(function(){

	new display.AssetManager( config.assets, main );

	function main ( assets ) {

		var screen = new display.Screen({

				width			: config.canvas.width,
				height			: config.canvas.height,
				frames			: 30
			}),

			grid = new display.Grid({

				origin			: screen.ctx,
				frames			: screen.frames,
				players			: 10,
				distanceToUser	: 350,
				circleOffset	: 100,
				circles			: 0
			}),

			controller = new display.Controller({

				screen			: screen
			}),

			connection = new display.Connection({

				controller		: controller,
				server			: config.server,
				port			: config.port
			});


		// grid
		display.Element.prototype.grid = grid;

		// assets
		display.Element.prototype.assets = assets;




		screen.elements.push( grid );

		/* debug */

		debug( screen, grid, controller, connection );
	}


})();
