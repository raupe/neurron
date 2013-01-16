(function(){

	controller.Box = (function(){

		var box = document.getElementById('box'),
			content = document.getElementById('content'),
			figure = document.getElementById('figure'),

			templates = { // Templates

				start: '<div id="start" class="button big">Start</div>',

				enterName: '\
				<div class="teamname">\
					<div class="info">Enter your Team-Name:</div>\
					<input id="input" type="name" class="input" autofocus />\
					<br>\
					<div id="skip" class="button small left">Skip</div>\
					<div id="okay" class="button small right">Okay</div>\
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

					var name =  document.getElementById('input').value
																.replace(/\n+/g,'')
																.replace(/\t+/g,'');
					// limit to ascii
					if ( name.length ) name = name.match(/[ -~]/g).join('');

					manage( config.commands.NAME, name );
					hide();
				}
			},

			manage;


		box.addEventListener('touchend', function ( e ) {

			var trg = e.target;

			if ( trg.id && buttons[trg.id] ) buttons[trg.id]();
		});



		var init = function ( handle ) {

				manage = handle;

				return this;
			},

			start = function(){

				box.className = 'box';
				content.innerHTML = templates.start;
			},

			name = function(){

				content.innerHTML = templates.enterName;
			},

			hide = function ( id ) {

				box.className = 'hide';
				content.innerHTML = '';

				// removes 'hide', color
				figure.className = 'figure ' + config.colors[ id || 1 ];

				function hide ( e ) {

					figure.removeEventListener( transitionend, hide );

					figure.className = 'figure hide';
				}

				setTimeout(function(){

					figure.className = 'figure fade pound';

					figure.addEventListener( transitionend, hide );

				}, 16.7);
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
