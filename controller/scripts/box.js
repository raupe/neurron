(function(){

	controller.Box = (function Box(){

		var content = document.getElementById('content'),
			figure = document.getElementById('figure'),

			templates = { // Templates

				start: '<div id="start" class="button large">Start</div>',

				enterName: '\
				<div class="teamname">\
					<div class="info">Enter your Team-Name:</div>\
					<input id="input" type="name" class="input" autofocus />\
					<br>\
					<div id="skip" class="button half left">Skip</div>\
					<div id="okay" class="button half right">Okay</div>\
				</div>',

				notFound: '<div class="warning teamname">The Game does not exist !</div>',

				alreadyRunning: '<div class="warning teamname">The Game is already running !</div>'
			},


			buttons = {

				start: function(){

					manage( config.commands.REGISTER );
				},

				skip: function(){

					manage( config.commands.NAME, '' );
					hide();
				},

				okay: function(){

					manage( config.commands.NAME, document.getElementById('input').value );
					hide();
				}
			},

			manage;

		// -------- trigger ---------- //

		document.getElementById('box').addEventListener('touchend', function ( e ) {

			var trg = e.target;

			if ( trg.id && buttons[trg.id] ) buttons[trg.id]();
		});


		// --------- public ---------//

		var init = function ( handle ) { manage = handle; },
			start = function(){	content.innerHTML = templates.start; },
			name = function(){ content.innerHTML = templates.enterName; },

			hide = function ( id ) {

				content.innerHTML = '';

				figure.innerHTML = '';
				figure.className = 'figure';

				var img = new Image();

				img.onload = function(){

					figure.appendChild( img );

					figure.className += ' moveTop';
				};

				img.src = 'figures/neurron_' + ( id || 1 ) + '.png';
			},

			warn = function ( type ) {

				var msg;

				if ( type === 2 ) msg = templates.alreadyRunning;
				if ( type === 3 ) msg = templates.notFound;

				content.innerHTML = msg;
			};

		start();

		return {

			init	: init,
			start	: start,
			name	: name,
			hide	: hide,
			warn	: warn
		};

	})();

})();
