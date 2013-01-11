(function(){


	/**
	 * [Input description]
	 */
	var Input = controller.Input = function() {

		this.screen = controller.Screen;

		this.cvs = this.screen.cvs;
		this.ctx = this.screen.ctx,

		this.origin = null;
		this.points = [];


		this.between = [];
		this.averageX = 0;
		this.averageY = 0;
		this.counter = 0;

		// this.tapped = false;

		this.color = null;

		this.init();


		controller.Screen.init( this );

		controller.Manager.prototype.input = this;
	};


	// stroking line
	var clearing = null,
		paused = null;


	Input.prototype.init = function(){

		if ( !( 'ontouchstart' in window ) ) {

			this.handleKeyboard();

		} else {

			this.setStyle();

			this.handleTouch();
		}

	};


	Input.prototype.disable = function(){

		// ToDo: remove handler - called on  set/int for button
		this.disabled = true;
	};


	Input.prototype.enable = function(){

		this.disabled = false;
	};


	Input.prototype.handleKeyboard = function() {

		document.addEventListener('keydown', function ( e ) {

			var key = e.which;

			if ( key === 39 ) this.manager.send( config.protocolCtoS.RIGHT ); // right
			if ( key === 37 ) this.manager.send( config.protocolCtoS.LEFT ); // left

			if ( key === 38 ) this.manager.send( config.protocolCtoS.TOP ); // top
			if ( key === 40 ) this.manager.send( config.protocolCtoS.BOTTOM ); // bottom

			if ( key === 13 ) this.manager.handle( config.commands.REGISTER ); // return
			if ( key === 32 ) this.manager.handle( config.commands.HEAL ); // space

		}.bind(this));
	};


	Input.prototype.handleTouch = function() {

		var cvs = this.cvs;

		cvs.addEventListener('touchstart', this.start.bind(this) );
		cvs.addEventListener('touchmove', this.move.bind(this) );
		cvs.addEventListener('touchend', this.end.bind(this) );
		cvs.addEventListener('touchcancel', this.cancel.bind(this) );
		cvs.addEventListener('touchleave', this.leave.bind(this) );
	};


	// Style settings
	Input.prototype.setStyle = function(){

		var ctx = this.ctx,
			color = config.playerColors[ this.color ];

		ctx.lineWidth = 16;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		ctx.strokeStyle = '#fff';

		ctx.shadowBlur = 20;
		ctx.shadowColor = color ? 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')' : '#BAE9F7';
	};




	Input.prototype.start =  function( e ) {

		e.preventDefault();
		e.stopPropagation();

		this.tapped = true;

		var touch = getPos( e.changedTouches[0] );

		this.origin = touch;

		this.averageX += touch.x;
		this.averageY += touch.y;


		// line
		if ( this.points.length ) this.clear();

		this.points.length = 0;
		this.points[0] = touch;

		setTimeout( this.clear.bind(this), config.clearDelay );
	};


	Input.prototype.move = function ( e ) {

		e.preventDefault();
		e.stopPropagation();

		// this.tapped = false;

		var touch = getPos( e.changedTouches[0] );

		this.between.push(touch);
		this.points.push(touch);

		this.averageX += touch.x;
		this.averageY += touch.y;
		this.counter++;

		// line
		if ( paused ) setTimeout( this.clear.bind(this), config.clearDelay );

		this.draw();
	};


	Input.prototype.end = function ( e ) {

		e.preventDefault();
		e.stopPropagation();

		var touch = getPos( e.changedTouches[0] );

		this.points.push( touch );

		// if ( this.tapped ) {

		//	//for heal
		//	this.manager.handle( config.commands.HEAL );
		//	return;
		// }

		this.tapped = false;

		this.averageX = this.averageX / this.counter;
		this.averageY = this.averageY / this.counter;

		this.manager.handle( config.commands.MOVE,
							[ this.origin, touch, this.averageX, this.averageY, this.between ] );

		this.between.length = 0;
		this.averageX = 0;
		this.averageY = 0;
		this.counter = 0;
	};



	Input.prototype.clear = function(){

		if ( clearing ) return;

		paused = false;

		clearing = window.setInterval(function(){

			if ( !this.points.length ) {

				clearInterval( clearing );
				clearing = null;

				paused = true;
				return;
			}

			this.points = this.points.slice(1);

			// animate -> missing glow
			this.ctx.clearRect( 0, 0, this.cvs.width, this.cvs.height );

			this.draw();

		}.bind(this), config.clearRate );
	};


	Input.prototype.draw = function(){

		var	ctx = this.ctx,
			points = this.points,
			l = points.length - 2,
			x2, y2;	// temp

		ctx.beginPath();

		// check
		if ( this.disabled || l <= 0 ) return;

		ctx.moveTo( points[0].x, points[0].y );

		for ( var i = 1; i < l; i++ ) {

			x2 = ( points[i].x + points[i+1].x ) / 2;
			y2 = ( points[i].y + points[i+1].y ) / 2;

			ctx.quadraticCurveTo( points[i].x, points[i].y, x2, y2 );
		}

		ctx.quadraticCurveTo( points[i].x, points[i].y,	points[i+1].x, points[i+1].y );

		ctx.stroke();
	};



	function getPos ( e ) {

		return {

			x: e.clientX || e.offsetX || e.layerX || e.pageX,
			y: e.clientY || e.offsetY || e.layerY || e.pageY
		};
	}


	Input.prototype.cancel = function ( e ) {

		e.preventDefault();
		e.stopPropagation();
	};


	Input.prototype.leave = function ( e ) {

		e.preventDefault();
		e.stopPropagation();
	};

})();
