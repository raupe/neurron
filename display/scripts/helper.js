(function() {

	// bind polyfill - https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
	if (!Function.prototype.bind) {

		Function.prototype.bind = function (oThis) {

			if (typeof this !== "function") {

				// closest thing possible to the ECMAScript 5 internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function () {},
				fBound = function () {

				return fToBind.apply(	this instanceof fNOP && oThis ? this : oThis || window,
										aArgs.concat(Array.prototype.slice.call(arguments)) );
				};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
	}


	/* requestAnimationFrame polyfill */
	var lastTime = 0,
		vendors = ['ms', 'moz', 'webkit', 'o'],
		x;

	for ( x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {

		window.requestAnimationFrame =	window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame  =	window[vendors[x]+'CancelAnimationFrame'] ||
										window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if ( !window.requestAnimationFrame ) {

		window.requestAnimationFrame = function ( callback, element ) {

			var currTime = new Date().getTime(),
				timeToCall = Math.max(0, 16 - (currTime - lastTime)),
				id = window.setTimeout(function(){callback(currTime + timeToCall);}, timeToCall);

			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if ( !window.cancelAnimationFrame ) {

		window.cancelAnimationFrame = function( id ) {

			clearTimeout(id);
		};
	}



	// cross browser event
	window.transitionEnd = (function(){

		var prefix = {

				'WebkitTransition'	: 'webkitTransitionEnd',
				'MozTransition'		: 'transitionend',
				'MSTransition'		: 'msTransitionEnd',
				'OTransition'		: 'oTransitionEnd',
				'transition'		: 'transitionEnd'
			},

			temp = document.createElement('div'),
			keys = Object.keys( prefix ),

			i, l; // iterator

		for ( i = 0, l = keys.length; i < l; i++ ) {

			if ( temp.style[ keys[i] ] !== undefined ) return prefix[ keys[i] ];
		}

		console.log('TransitionEnd - is not supported');

	})();

}());
