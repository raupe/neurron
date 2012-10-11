(function(){

	var Input = controller.Input = function ( config ) {

		this.screen = config.screen;
		this.action = config.action;

		this.addHandler();
	};


	Input.prototype.addHandler = function(){

		if ( 'ontouchstart' in window ) {

			this.handleTouch();

		} else {

			this.handleKeyboard();
		}

	};

	Input.prototype.handleKeyboard = function() {


		document.addEventListener('keydown', function ( e ) {

			console.log(e);
		});

	};

	Input.prototype.handleTouch = function() {

		var cvs = this.screen.cvs,
			ctx = this.screen.ctx,

			action = this.action,

			starts = [];

		cvs.addEventListener('touchstart', function ( e ) {

			e.preventDefault();
			e.stopPropagation();

			var touches = e.changedTouches;

			for ( var i = 0, l = touches.length; i < l; i++ ) {

				starts.push(touches[i]);
			}
		});


		cvs.addEventListener('touchmove', function ( e ) {

			e.preventDefault();
			e.stopPropagation();

			var touches = e.changedTouches,

				end,

				current;

			for ( var i = 0, l = touches.length; i < l; i++ ) {

				end =  touches[i];
				current = starts[i];

				ctx.lineTo( current.clientX, current.clientY, end.clientX, end.clientY );

				starts[i] = end;
			}

			ctx.stroke();
		});

		cvs.addEventListener('touchend', function ( e ) {


			e.preventDefault();
			e.stopPropagation();

			// console.log('end',e);

// ctx.fillRect( 0, 0, cvs.width, cvs.height );


// 			ctx.save();

// 			ctx.clearRect( 0, 0, cvs.width, cvs.height );

// 			ctx.restore();

			ctx.save();

			ctx.clearRect( 0 , 0 ,cvs.width, cvs.height);

			ctx.restore();
		});


		cvs.addEventListener('touchcancel', function ( e ) {


			e.preventDefault();
			e.stopPropagation();

			// console.log(e);
		});

		cvs.addEventListener('touchleave', function ( e ) {


			e.preventDefault();
			e.stopPropagation();

			// console.log(e);
		});

	};


	/* calculates relative position */
	Input.prototype.pos = function(){


	};

})();
