(function(){

	new display.Loader( config.assets, function ( assets ) {

		display.Element.prototype.assets = assets;

		var screen = new display.Screen({

				width: config.canvas.width,
				height: config.canvas.height,
				frames: 30
			}),

			controller = new display.Controller({

				screen: screen
			}),

			connection = new display.Connection({

				controller: controller,
				server: config.server,
				port: config.port
			});


		/* debug */

		debug( screen, controller, connection );

	});



})();
