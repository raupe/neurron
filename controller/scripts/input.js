(function(){

	var Input = controller.Input = function() {

		this.cvs = this.screen.cvs;
		this.ctx = this.screen.ctx,

        this.origin = null;
        this.last = null;

        this.averageX = 0;
        this.averageY = 0;
        this.counter = 0;

		this.tapped = false;

		this.init();
//        this.setStyle({r: 255, g: 0, b: 0}); // for development

		controller.Box.prototype.input = this;
        controller.Screen.prototype.input = this;
        controller.Manager.prototype.input = this;
	};


	Input.prototype.init = function(){


		if ( !( 'ontouchstart' in window ) ) {

			this.handleKeyboard();
		}

	};


	Input.prototype.disable = function(){

		this.disabled = true;

		// ToDo: remove handler - called on  set/int for button
	};


	Input.prototype.enable = function(){

		this.addHandler();
		this.disabled = false;

		return function(){

			this.disabled = false;
		};
	};


	Input.prototype.addHandler = function(){

		if ( 'ontouchstart' in window ) {

			// this.setStyle();

			this.handleTouch();
		}
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
	Input.prototype.setStyle = function ( color ) {

		var ctx = this.ctx,
			cvs = this.cvs;

        ctx.lineWidth = 3;
		ctx.lineCap = 'round';

		ctx.strokeStyle = '#fff'; //color ? 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')' : '#FFF';
        ctx.shadowColor = color ? 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')' : '#BAE9F7';

        ctx.shadowBlur = 20;
	};


	Input.prototype.start =  function( e ) {

		e.preventDefault();
		e.stopPropagation();

		this.tapped = true;


		var touch = getPos( e.changedTouches[0] );

		this.origin = touch;
		this.last = touch;

        this.averageX += touch.x;
        this.averageY += touch.y;

		this.ctx.beginPath();
	};


	Input.prototype.move = function ( e ) {

		e.preventDefault();
		e.stopPropagation();

		this.tapped = false;


		var touch = getPos( e.changedTouches[0] ),
			last = this.last,
			ctx = this.ctx;


		// ToDo: check for device property
		if ( !this.disabled ) {

			ctx.lineTo( last.x, last.y, touch.x, touch.y );
		}

		this.last = touch;


        this.averageX += touch.x;
        this.averageY += touch.y;
        this.counter++;


        ctx.stroke();
	};


	Input.prototype.end = function ( e ) {

		e.preventDefault();
		e.stopPropagation();


		var manager = this.manager,
			touch = getPos( e.changedTouches[0] ),
			origin = this.origin;
			console.log(touch);

		if ( this.tapped ) {

			// ToDo: tapped animation
			manager.handle( config.commands.HEAL );

			return;
		}


		this.tapped = false;


        this.averageX = this.averageX / this.counter;
        this.averageY = this.averageY / this.counter;

		manager.handle( config.commands.MOVE, [ origin, touch, this.averageX, this.averageY ] );

		this.screen.clear();


        this.averageX = 0;
        this.averageY = 0;
        this.counter = 0;
	};



	function getPos ( e ) { // client x,y ?, screenX, screenY ?

		if ( e.offsetX ) {

			return { x: e.offsetX, y: e.offsetY };

		} else if ( e.layerX ) {

			return { x: e.layerX, y: e.layerY };

		} else {

			return { x: e.pageX, y: e.pageY };
		}
	}



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
