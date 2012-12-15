(function(){

	/**
	 * [Box description]
	 */
	var Box = controller.Box = function() {

		this.visible = {

			box:    false,
			top:    false,
			center: false,
			bottom: false
		};

		this.listen();

		this.cancel();
	};


	/**
	 * [unset description]
	 * @return {[type]} [description]
	 */
	Box.prototype.unsetAll = function(){

		this.hide( 'box' );
		this.hide( 'top' );
		this.hide( 'center' );
		this.hide( 'bottom' );
	};


	/**
	 * [show description]
	 * @return {[type]} [description]
	 */
	Box.prototype.show = function ( id ) {

		removeClass( document.getElementById( id ), 'hide' );

		this.visible[ id ] = true;
	};


	/**
	 * [hide description]
	 * @return {[type]} [description]
	 */
	Box.prototype.hide = function ( id ) {

		// document.getElementById( id ).className += ' hide';
		addClass( document.getElementById( id ), 'hide' );

		this.visible[ id ] = false;
	};




	/**
	 * [set description]
	 * @param {[type]} id       [description]
	 * @param {[type]} category [description]
	 */
	Box.prototype.set = function ( id, category ) {

		var element = document.getElementById( id );

		if ( !this.visible.box ) this.show('box');
		if ( !this.visible[ id ] ) this.show( id );

		this.changeBehaviour( element, category[0], category[2] );

		element.textContent = category[1];
		// element.children[0].textContent = category[1];
	};


	/**
	 * [setAttributes description]
	 * @param {[type]} element [description]
	 * @param {[type]} type    [description]
	 */
	Box.prototype.changeBehaviour = function ( element, type, fn ) {

		// ToDo: add styling classes

		// if ( type === 'label' ) {}

		if ( type === 'button' ) {

			element.setAttribute( 'data-fn', fn );
		}

		if ( type === 'form' ) {

			var form = document.getElementById('form');

			if ( !form ) {

				form = document.createElement('div');

				form.innerHTML = '\
				<input id="input" type="name" class="input">\
				<br>\
				<div>\
					<button id="confirm" data-fn="confirm">Confirm</button>\
					<button id="cancel" data-fn="cancel">Cancel</button>\
				</div>\
				';
				form.className = 'form';
				form.id = 'form';

				setTimeout(function(){ // needs time to parse-create the innerHTML

					element.appendChild( form );

					document.getElementById('input').addEventListener('keyup', function ( e ) {

						if ( e.which === 13) this.confirm();

					}.bind(this) );

				}.bind(this), 16.7);

			} else {

				this.show( 'form' );
			}

		}
	};


	/**
	 * [listen description]
	 * @param  {[type]}   element [description]
	 * @param  {Function} fn      [description]
	 * @return {[type]}           [description]
	 */
	Box.prototype.listen = function() {

		document.getElementById('box').addEventListener('touchend', function ( e ) {

			var trg = e.target;

			if ( trg.hasAttribute( 'data-fn' ) ) {

				this[ trg.getAttribute('data-fn') ]();
			}

		}.bind(this));
	};


	/**
	 * [confirm description]
	 * @return {[type]} [description]
	 */
	Box.prototype.confirm = function(){ // teamname

		var value = document.getElementById('input').value;

		if ( value ) {

			this.unsetAll();

			this.input.enable();

			this.manager.send( config.protocolCtoS.TEAMNAME, value );
		}

	};


	Box.prototype.label = function ( category ) {

		this.unsetAll();

		if ( !this.input.disabled ) this.input.disable();

		this.show( 'box' );

		this.set( 'center', config.boxes[ category ] );
	};


	/**
	 * [cancel description]
	 * @return {[type]} [description]
	 */
	Box.prototype.cancel = function(){ // original

		this.unsetAll();

		if ( !this.input.disabled ) this.input.disable();

		this.show( 'box' );

		this.set( 'top', config.boxes[ 4 ] );       // teamname
		this.set( 'bottom', config.boxes[ 5 ] );    // without
	};


	/**
	 * [askTeamname description]
	 * @return {[type]} [description]
	 */
	Box.prototype.askTeamname = function(){

		this.unsetAll();

		this.show( 'box' );

		this.set( 'top', config.boxes[ 6 ] );    // label
		this.set( 'bottom', config.boxes[ 7 ] ); // form

		this.manager.handle( config.commands.REGISTER, 1 );
	};


	/**
	 * [goCountdown description]
	 * @return {[type]} [description]
	 */
	Box.prototype.goCountdown = function(){

		this.unsetAll();

		this.manager.handle( config.commands.REGISTER );
	};



	function hasClass(ele,cls) {
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}
	function addClass(ele,cls) {
		if (!hasClass(ele,cls)) ele.className += " "+cls;
	}
	function removeClass(ele,cls) {
		// if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
		// }
	}



})();


/**
	 * [ description]
	 * @param  {[type]}
	 * @return {[type]}   [description]
	 */
	// window.addEventListener('orientationchange', function() {

	//     document.getElementById('text').style['z-index'] = 1;

	// }.bind(this) );

