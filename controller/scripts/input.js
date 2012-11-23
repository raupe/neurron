(function(){

	var Input = controller.Input = function() {

        // default
		this.cvs = this.screen.cvs;
		this.ctx = this.screen.ctx,

        this.origins = [];
        this.starts = [];

		this.tapped = false;

		controller.Button.prototype.input = this;
	};


	Input.prototype.disable = function(){

		// ToDo: remove handler - called on  set/int for button
	};


	Input.prototype.enable = function(){

		this.addHandler();
	};


	Input.prototype.addHandler = function(){

		if ( 'ontouchstart' in window ) {

			this.setStyle();

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

		this.cvs = cvs;

		cvs.addEventListener('touchstart', this.start.bind(this) );

		cvs.addEventListener('touchmove', this.move.bind(this) );

		cvs.addEventListener('touchend', this.end.bind(this) );

		cvs.addEventListener('touchcancel', this.cancel.bind(this) );

		cvs.addEventListener('touchleave', this.leave.bind(this) );
	};



	// Style settings
	Input.prototype.setStyle = function() {

		var ctx = this.ctx,
			cvs = this.cvs,

			grd;

        ctx.lineWidth = 3;
		ctx.lineCap = 'round';
        ctx.shadowColor= '#BAE9F7';
        ctx.shadowBlur = 20;

        grd = ctx.createLinearGradient( 0, 0, cvs.width, cvs.height );

        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(0.5, '#BAE9F7');
        grd.addColorStop(1, '#ffffff');

		ctx.strokeStyle = grd;
	};


	Input.prototype.start =  function( e ) {

		e.preventDefault();
		e.stopPropagation();

		this.tapped = true;


		var touches = e.changedTouches,
			origins = this.origins,
			starts = this.starts;

		for ( var i = 0, l = touches.length; i < l; i++ ) {

			origins.push( touches[i] );
			starts.push( touches[i] );
		}

		this.ctx.beginPath();
	};


	Input.prototype.move = function ( e ) {

		e.preventDefault();
		e.stopPropagation();

		this.tapped = false;


		var touches = e.changedTouches,
			ctx = this.ctx,

			starts = this.starts,
			current,
			end;

		for ( var i = 0, l = touches.length; i < l; i++ ) {

			end = touches[i];
			current = starts[i];

			// ToDo: check for device property
			ctx.lineTo( current.clientX, current.clientY, end.clientX, end.clientY );

			starts[i] = end;
		}

		ctx.stroke();
	};


	Input.prototype.end = function ( e ) {

		e.preventDefault();
		e.stopPropagation();


		var manager = this.manager;


		if ( this.tapped ) {

			manager.handle( config.commands.HEAL );

			this.tapped = false;

			return;
		}

		var touches = e.changedTouches,

			origins = this.origins,
			starts = this.starts,

			ends = [];

		for ( var i = 0, l = touches.length; i < l; i++ ) {

			ends.push( touches[i] );
		}

		manager.handle( config.commands.MOVE, [ origins , ends ] );

		origins.length = starts.length = 0;

		this.screen.clear();
	};



	Input.prototype.cancel = function ( e ) {

		e.preventDefault();
		e.stopPropagation();
		// console.log(e);
	};


	Input.prototype.leave = function ( e ) {

		e.preventDefault();
		e.stopPropagation();
		// console.log(e);
	};



})();
