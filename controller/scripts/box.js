(function(){

	controller.Box = (function(){

		var box = document.getElementById('box'),
			content = document.getElementById('content'),
			hint = document.getElementById('hint'),
			manager = null;

		// -------- Templates

		var	description;

		if ( window.matchMedia ) {

			if ( window.matchMedia("(max-width: 1378px)").matches ) description = 'Enter your Team-Name (default: none)';
			if ( window.matchMedia("(max-width: 1024px)").matches ) description = 'Enter your Team-Name';
			if ( window.matchMedia("(max-width: 800px)").matches )	description = 'Enter Team-Name';
			if ( window.matchMedia("(max-width: 480px)").matches )	description = 'Team-Name';
			if ( window.matchMedia("(max-width: 320px)").matches )	description = 'Name';

		} else {

			description = 'Name';
		}


		var templates = {

			start: '<div id="start" class="button start">Start</div>',

			enterName: '\
			<input id="input" type="name" class="whitebox input" autofocus placeholder=""/>\
			<div class="ready">Everybody ready ?</div>\
			<div id="okay" class="button okay">Okay</div>\
			',

			notFound: '<div class="whitebox warning">The Game does not exist !</div>',

			alreadyRunning: '<div class="whitebox warning">The Game is already running !</div>'
		};


		var buttons = {

			start: function(){

				manager.register();
			},

			okay: function(){

				var name =  document.getElementById('input').value
															.replace(/\n+/g,'')
															.replace(/\t+/g,'');
				// limit to ascii & size
				if ( name.length ) name = name.match(/[ -~]/g).join('');
				if ( name.length > 10 ) name = name.substr(0,9) + '.';

				manager.name( name );

				hide();
			}
		};


		//  ---------- private ---------------------

		function hide ( center )  {

			box.className = 'hide';
			content.innerHTML = '';

			hint.className = 'hint visible' + ( center ? ' center' : '' );

			setTimeout(function(){

				hint.className = 'hint opaque fading' + ( center ? ' center' : '' );
				hint.addEventListener( transitionEnd, hideHint );

			}, 16.7);
		}

		function hideHint(){

			hint.removeEventListener( transitionEnd, hideHint );
			hint.className = 'hint opaque';
		}


		function reset(){

			controller.Screen.clear();

			box.className = 'box';
			hint.className = 'hint opaque';
			content.innerHTML = templates.start;
		}

		//  ---------- public ---------------------

		/**
		 * [init description]
		 * @param  {[type]} ref [description]
		 * @return {[type]}     [description]
		 */
		var init = function ( ref ){

			manager = ref;

			box.addEventListener('touchend', function ( e ) {

				var trg = e.target;

				if ( trg.id && buttons[trg.id] ) buttons[trg.id]();
			});

			reset();
		};


		var	start = reset,
			skip = hide;

		var name = function(){

			content.innerHTML = templates.enterName;

			hint.className = 'hint visible';

			document.getElementById('input').setAttribute('placeholder', description );
		};

		var warn = function ( type ) {

			reset(); // although waste of start...

			var msg;

			if ( type === 2 ) msg = templates.alreadyRunning;
			if ( type === 3 ) msg = templates.notFound;

			content.innerHTML = msg;

			box.className = 'box';
			hint.className = 'hint opaque';
		};


		// Interface
		var Box = {

			init	: init,
			start	: start,
			name	: name,
			skip	: skip,
			warn	: warn
		};

		return Box;

	})();

})();
