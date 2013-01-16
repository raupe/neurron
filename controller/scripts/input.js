(function(){

	controller.Input = (function(){

		var screen = controller.Screen,

			cvs = screen.cvs,
			ctx = screen.ctx,

			origin = null,
			points = [],

			between = [],
			averageX = 0,
			averageY = 0,
			counter = 0,

			color = null,
			enabled = false,

			clearing = null,
			timer = null,

			paused = null,
			//tapped = false,

			manage; // temp


		// ---- public ----- //

		var active = function ( change ) {

				enabled = change;
			},


			setStyle = function ( param ) {

				if ( param ) color = config.shadowColors[ config.colors[ param ] ];

				ctx.lineWidth = 10;
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';

				ctx.strokeStyle = '#fff';

				ctx.shadowBlur = 20;
				ctx.shadowColor = color ? 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')' : '#BAE9F7';
			},


			init = function ( handle ) {

				// setup
				if ( 'ontouchstart' in window ) {

					handleTouch();

					setStyle();
				}

				manage = handle;

				return this;
			};


		// ----- private ----- //

		function handleTouch() {

			cvs.addEventListener('touchstart', start );
			cvs.addEventListener('touchmove', move );
			cvs.addEventListener('touchend', end );
			cvs.addEventListener('touchcancel', cancel );
			cvs.addEventListener('touchleave', leave );
		}

		function start ( e ) {

			e.preventDefault();
			e.stopPropagation();

			// reset on start
			if ( clearing )	clearInterval( clearing );
			if ( timer ) clearTimeout( timer );

			ctx.clearRect( 0, 0, cvs.width, cvs.height );
			points.length = 0;
			clearing = null;

			var touch = getPos( e.changedTouches[0] );
			// tapped = true;

			origin = touch;

			averageX += touch.x;
			averageY += touch.y;

			points[0] = touch;

			timer = setTimeout( clear, config.clearDelay );
		}


		function move ( e ) {

			e.preventDefault();
			e.stopPropagation();

			// tapped = false;

			var touch = getPos( e.changedTouches[0] );

			between.push(touch);
			points.push(touch);

			averageX += touch.x;
			averageY += touch.y;
			counter++;

			// line
			if ( paused ) timer = setTimeout( clear, config.clearDelay );

			draw();
		}


		function end ( e ) {

			e.preventDefault();
			e.stopPropagation();

			var touch = getPos( e.changedTouches[0] );

			points.push( touch );

			/*
				// heal
				if ( tapped ) {

					manage( config.commands.HEAL );
					return;
				}

				tapped = false;
			 */

			averageX /= counter;
			averageY /= counter;

			manage( config.commands.MOVE,[ origin, touch, averageX, averageY, between ] );

			between.length = 0;
			averageX = 0;
			averageY = 0;
			counter = 0;
		}


		function clear() {

			timer = null;

			if ( clearing ) return;

			paused = false;

			clearing = setInterval(function(){

				if ( !points.length ) {

					clearInterval( clearing );
					clearing = null;

					paused = true;
					return;
				}

				points = points.slice(1);

				ctx.clearRect( 0, 0, cvs.width, cvs.height );

				// -> remove instant
				// points.length = 0;

				draw();

			}, config.clearRate );
		}


		function draw(){

			var l = points.length - 2,

				x2, y2;	// temp

			// reset start
			ctx.beginPath();

			if ( !enabled || l <= 0 ) return;

			ctx.moveTo( points[0].x, points[0].y );

			for ( var i = 1; i < l; i++ ) {

				x2 = ( points[i].x + points[i+1].x ) / 2;
				y2 = ( points[i].y + points[i+1].y ) / 2;

				ctx.quadraticCurveTo( points[i].x, points[i].y, x2, y2 );
			}

			ctx.quadraticCurveTo( points[i].x, points[i].y,	points[i+1].x, points[i+1].y );

			ctx.stroke();
		}


		function getPos ( e ) {

			return {

				x: e.clientX || e.offsetX || e.layerX || e.pageX,
				y: e.clientY || e.offsetY || e.layerY || e.pageY
			};
		}

		function cancel ( e ) {

			e.preventDefault();
			e.stopPropagation();
		}


		function leave ( e ) {

			e.preventDefault();
			e.stopPropagation();
		}


		// pass for resize
		screen.init( setStyle );

		return {

			init	: init,
			active	: active,
			setStyle: setStyle
		};

	})();


})();
