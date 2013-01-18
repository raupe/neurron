(function(){

	/**
	 * [move description]
	 * @param  {[type]} manager [description]
	 * @param  {[type]} params  [description]
	 * @return {[type]}         [description]
	 */
	controller.Move = function ( send, params )  {

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

		m1 = (end.y - start.y) / ( end.x - start.x ),
		m2 = -1/m1;

		var blength = betweens.length;

		for ( var i = 0; i < blength; i++ ) {

			between.x = betweens[i].x;
			between.y = betweens[i].y;

            if ( (end.y - start.y && end.x - start.x) !== 0 ){

                sX = ((-between.x * m2) + between.y + (start.x * m1) - start.y) / (m1 - m2);
                sY = m2 * (sX - between.x) + between.y;

                difference = (between.x - sX) * (between.x - sX) + (between.y - sY) * (between.y - sY);
            }

			if ( diffX > diffY ) {

                if ( start.y === end.y ) {

                    difference = start.y - between.y;
                    difference *= start.x < end.x ? 1 : -1;

                }
				else if ( start.x > end.x ) {

					difference *= between.y > sY ? 1 : -1;

				} else {

					difference *= between.y < sY ? 1 : -1;
				}

			} else if ( diffX < diffY ) {

                if ( start.x === end.x ) {

                    difference = start.x - between.x;
                    difference *= start.y > end.y ? 1 : -1;

                }
				else if ( start.y < end.y ) {

					difference *= between.x > sX ? 1: -1;

				} else {

					difference *= between.x < sX ? 1: -1;
				}
			}

			sum += difference;
		}

		//	console.log('end: ',sum);

		if ( diffX > diffY ) {

            if ( start.y === end.y ) {

                direction = sum > 0 ? config.protocolCtoS.CLOCKWISE : config.protocolCtoS.ANTICLOCKWISE;

            } else if ( start.x > end.x ) {

                direction = sum > 0 ? config.protocolCtoS.CLOCKWISE : config.protocolCtoS.ANTICLOCKWISE;

			} else {

                direction = sum < 0 ? config.protocolCtoS.ANTICLOCKWISE : config.protocolCtoS.CLOCKWISE;
			}

		} else if ( diffX < diffY ) {

            if ( start.x === end.x ) {

                direction = sum > 0 ? config.protocolCtoS.CLOCKWISE : config.protocolCtoS.ANTICLOCKWISE;

            } else if ( start.y < end.y ) {

				direction = sum < 0 ? config.protocolCtoS.ANTICLOCKWISE : config.protocolCtoS.CLOCKWISE;

			} else {

				direction = sum > 0 ? config.protocolCtoS.CLOCKWISE : config.protocolCtoS.ANTICLOCKWISE;
			}
		}

		send( direction );
	};


})();
