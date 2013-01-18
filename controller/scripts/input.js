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

			shadowColor = null,
			enabled = false,

			clearing = null,
			timer = null,

			//tapped = false,
			paused = null,
			manager = null;



		// ----- private ----- //

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

		function clear () {

			timer = null;

			if ( clearing ) return;

			paused = false;

			clearing = setInterval(function(){

				if ( clearing && !points.length ) {

					clearInterval( clearing );
					clearing = null;

					paused = true;
					return;
				}

				points = points.slice(1);

				ctx.clearRect( 0, 0, cvs.width, cvs.height );

				draw();

			}, config.clearRate );
		}


		function getPos ( e ) {

			return {

				x: e.clientX || e.offsetX || e.layerX || e.pageX,
				y: e.clientY || e.offsetY || e.layerY || e.pageY
			};
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

					manager.heal( config.commands.HEAL );
					return;
				}

				tapped = false;
			 */

			averageX /= counter;
			averageY /= counter;

			manager.move([ origin, touch, averageX, averageY, between ]);

			between.length = 0;
			averageX = 0;
			averageY = 0;
			counter = 0;
		}


		function cancel ( e ) {

			e.preventDefault();
			e.stopPropagation();
		}


		function leave ( e ) {

			e.preventDefault();
			e.stopPropagation();
		}


		function handleTouch() {

			cvs.addEventListener('touchstart', start );
			cvs.addEventListener('touchmove', move );
			cvs.addEventListener('touchend', end );
			cvs.addEventListener('touchcancel', cancel );
			cvs.addEventListener('touchleave', leave );
		}


		function style() {

			ctx.lineWidth = 10;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			ctx.strokeStyle = '#fff';

			ctx.shadowBlur = 20;
			ctx.shadowColor = shadowColor ? 'rgb(' + shadowColor.r + ',' + shadowColor.g + ',' + shadowColor.b + ')' : '#BAE9F7';
		}


		// ---- public ----- //

		var init = function ( ref ) {

			manager = ref;

			if ( 'ontouchstart' in window ) handleTouch();

			screen.init( style );
		};

		var setStyle = function ( param ) {

			var color = config.colors[ param ];

			shadowColor = config.shadowColors[ color ];

			screen.cvs.className = 'background ' + color;

			style();
		};

		var active = function ( change ) {

			enabled = change;

			if ( !change ) points.length = 0; // clear
		};


		// Interface
		var Input = {

			init	: init,
			setStyle: setStyle,
			active	: active
		};

		return Input;

	})();


})();
