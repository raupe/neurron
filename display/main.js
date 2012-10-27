(function(){

	new display.Loader( config.assets, function ( assets ) {

		display.Element.prototype.assets = assets;

		var screen = new display.Screen({

				width: config.canvas.width,
				height: config.canvas.height,
				frames: 30
			}),

			action = new display.Action({

				screen: screen
			}),

			connection = new display.Connection({

				action: action,
				server: config.server,
				port: config.port
			});


		/* debug */

		debug( screen, action, connection );

	});



})();
