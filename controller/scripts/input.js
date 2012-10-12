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

            origins = [],
            starts = [];

		cvs.addEventListener('touchstart', function ( e ) {

			e.preventDefault();
			e.stopPropagation();

			var touches = e.changedTouches;

			for ( var i = 0, l = touches.length; i < l; i++ ) {

				starts.push(touches[i]);
                origins.push(touches[i]);

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

                ctx.moveTo( current.clientX, current.clientY );
                ctx.lineTo( end.clientX, end.clientY );

                starts[i] = end;
			}

			ctx.stroke();
            ctx.beginPath();


		});

		cvs.addEventListener('touchend', function ( e ) {


			e.preventDefault();
			e.stopPropagation();

            var touches = e.changedTouches,
                ends = [];

            for ( var i = 0, l = touches.length; i < l; i++ ) {

                ends.push(touches[i]);
            }
            console.log(origins, ends);
            action.delegate(origins ,ends);

            origins.length = starts.length =  0;

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
