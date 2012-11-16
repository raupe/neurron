(function(){

	var Input = controller.Input = function() {

		this.addHandler();


		controller.Button.prototype.input = this;
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

			manager = this.manager,

            origins = [],
            starts = [];


        // style settings


        ctx.lineWidth = 18;
		ctx.lineCap = 'round';
        var grd = ctx.createLinearGradient(0, 0, cvs.width, cvs.height);
        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(0.5, '#BAE9F7');
        grd.addColorStop(1, '#ffffff');


		ctx.strokeStyle = grd;


		this.started = false;


		cvs.addEventListener('touchstart', function ( e ) {

			e.preventDefault();
			e.stopPropagation();

			if ( this.started ) {

				var touches = e.changedTouches;

				for ( var i = 0, l = touches.length; i < l; i++ ) {

					starts.push(touches[i]);
					origins.push(touches[i]);
				}

				ctx.beginPath();

			} else {

				// console.log('start');
			}



		}.bind(this));


		cvs.addEventListener('touchmove', function ( e ) {

			e.preventDefault();
			e.stopPropagation();

			if ( this.started ) {

				var touches = e.changedTouches,

					end,
					current;

				for ( var i = 0, l = touches.length; i < l; i++ ) {

					end = touches[i];
					current = starts[i];

					// ctx.moveTo( current.clientX, current.clientY );
					// ctx.lineTo( end.clientX, end.clientY );
					// ctx.lineTo( current.clientX, current.clientY );
					ctx.lineTo( current.clientX, current.clientY, end.clientX, end.clientY );

					starts[i] = end;
				}

				ctx.stroke();
			}

		}.bind(this));

		cvs.addEventListener('touchend', function ( e ) {

			e.preventDefault();
			e.stopPropagation();

			if ( this.started ) {

				var touches = e.changedTouches,
					ends = [];

				for ( var i = 0, l = touches.length; i < l; i++ ) {

					ends.push(touches[i]);
				}

				manager.delegate(origins ,ends);

				origins.length = starts.length =  0;

				ctx.save();

				ctx.clearRect( 0 , 0 ,cvs.width, cvs.height);

				ctx.restore();

			} else {

				// console.log('start-end');

				// manager.start();

				// started = true; // later: in callback of onload
			}

		}.bind(this));


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
