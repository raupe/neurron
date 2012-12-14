(function(){

	/**
	 * [move description]
	 * @param  {[type]} manager [description]
	 * @param  {[type]} params  [description]
	 * @return {[type]}         [description]
	 */
	function move ( manager, params )  {

		var start = params[0],
			end = params[1],
			betweens = params[4],
			diffX = Math.abs(end.x - start.x),
			diffY = Math.abs(end.y - start.y),

			between = {},
			sX, sY,
			m1, m2,
			difference = 0,
			sum = 0,
			direction = 0;

		// direction = config.protocolCtoS.ANTICLOCKWISE;

		m1 = (end.y - start.y) / ( end.x - start.x ),
		m2 = -1/m1;

		var blength = betweens.length;

		for ( var i = 0; i < blength; i++ ) {

			between.x = betweens[i].x;
			between.y = betweens[i].y;

			sX = ((-between.x * m2) + between.y + (start.x * m1) - start.y) / (m1 - m2);
			sY = m2 * (sX - between.x) + between.y;

			difference = (between.x - sX) * (between.x - sX) + (between.y - sY) * (between.y - sY);

			if ( diffX > diffY ) {

				if ( start.x > end.x ) {

					difference *= between.y > sY ? 1 : -1;

				} else {

					difference *= between.y < sY ? 1 : -1;
				}

			} else if ( diffX < diffY ) {

				if ( start.y < end.y ) {

					difference *= between.x > sX ? 1: -1;

				} else {

					difference *= between.x < sX ? 1: -1;
				}
			}

			sum += difference;
		}

		console.log('end: ',sum);

		if ( diffX > diffY ) {

			if ( start.x > end.x ) {

				if ( sum > 0 ) {

					direction = config.protocolCtoS.CLOCKWISE;

				} else {

					direction = config.protocolCtoS.ANTICLOCKWISE;
				}

			} else {

				if ( sum < 0 ) {

					direction = config.protocolCtoS.ANTICLOCKWISE;

				} else {

					direction = config.protocolCtoS.CLOCKWISE;
				}
			}

		} else if ( diffX < diffY ) {

			if ( start.y < end.y ) {

				if ( sum < 0 ) {

					direction = config.protocolCtoS.ANTICLOCKWISE;

				} else {

					direction = config.protocolCtoS.CLOCKWISE;
				}

			} else {

				if (sum > 0) {

					direction = config.protocolCtoS.CLOCKWISE;

				} else {

					direction = config.protocolCtoS.ANTICLOCKWISE;
				}
			}
		}

		if ( direction === config.protocolCtoS.CLOCKWISE ) {

			console.log("uhrzeiger");

		} else {

			console.log("gegen uhrzeiger");
		}

		manager.send( direction );
	}


	controller.move = move;

})();
