(function(){

	display.views.start = (function(){

		var left = '\
		<div class="slider_content_wrap">\
			<div class="logo">\
				<img src="style/images/neurron_logo.png" width="356" height="113" alt="neurron logo" />\
				<div class="subtitle">END OF THE TUNNEL</div>\
			</div>\
			<div id="slider_box_wrap" class="slider_box_wrap">\
				<ul id="button_wrap">\
					<li id="btn-idea" class="button button_color idea_button"><p>idea</p></li>\
					<li id="btn-game" class="button button_color game_button"><p>game</p></li>\
				</ul>\
				<div class="dashboard round"></div>\
				<ul id="screen_wrap" class="screen_wrap round">\
					<li id="idea" class="screen hide">\
						<video muted controls preload="auto" poster="assets/views/start/idea.jpg" class="video">\
							<source src="assets/views/start/idea.mp4" type="video/mp4" />\
							<source src="assets/views/start/idea.ogv" type="video/ogg" />\
							The browser doesn\'t support any of the provided formats...\
						</video>\
					</li>\
					<li id="game" class="screen hide">\
						<video muted controls preload="auto" poster="assets/views/start/game.jpg" class="video">\
							<source src="assets/views/start/game.mp4" type="video/mp4" />\
							<source src="assets/views/start/game.ogv" type="video/ogg" />\
							The browser doesn\'t support any of the provided formats...\
						</video>\
					</li>\
				</ul>\
			</div>\
		</div>';

		return { left: left	};

	})();


	// Cache
	var idea, game,
		music,

		$buttons,
		$items,
		$container,
		$containerRight,
		$qrCode,

		counter,
		duration,
		itemsLength,
		timer;


	display.logic.start = function(){

		if ( idea && game ) {

			start();

		} else { // first time

			music = display.getAsset('audio', 'start');
			if ( music ) music.loop = true;


			idea = document.getElementById('idea').children[0];
			game = document.getElementById('game').children[0];


			$buttons = $('#button_wrap > li');
			$items = $('#screen_wrap > li');
			$container = $('#container');
			$containerRight = $('#container-right');
			$qrCode = $('#qr_code > img');
			$site = $('#site');



			// event handler
			$($buttons).click(function(){

				if ( timer ) clearTimeout(timer);
				if ( counter === $(this).index() ) return;

				$($buttons[counter]).removeClass('button_active');
				$($items[counter]).fadeOut();

				counter = $(this).index();
				timeOut();
			});

			$(idea).on('loadedmetadata', start );
			$(idea).on('ended', function(){ document.getElementById('btn-game').click(); });

			$(game).on('loadedmetadata', start);
			$(game).on('ended', function(){ document.getElementById('btn-idea').click(); });
		}

		$container.addClass("backgroundImage");
		$containerRight.removeClass("marginTopPadding");
		$qrCode.removeClass("halfQR");

        // to make qr code normal size after canceling (2 minutes in loading screen)
        $('#qr_code img').removeClass("halfQR");

        // to display qr code when coming back from contact site
        // $('#qr_code').removeClass("fadeOut");
        // $('#qr_code').addClass("fadeIn");
		$site.fadeIn(1000);
	};


	function start(){

		if ( !idea.duration || !game.duration ) return;

		if ( music ) display.sound( music );

		duration = {

			idea	: ~~( idea.duration * 1000 ) + 1000,
			game	: ~~( game.duration * 1000 ) + 1000
		};

		itemsLength = $items.length;

		$buttons.removeClass('button_active');
		idea.currentTime = 0;
		game.currentTime = 0;

		counter = counter || 0;

		timeOut();
	}

	//set time out
	function timeOut(){

		var currentId = $items[counter].id,
			durationTime = duration[currentId];

		$($items[counter]).fadeIn();
		$($buttons[counter]).addClass('button_active');

		if ( currentId === 'idea' ) setTimeout(function(){ idea.play(); }, 1000);
		if ( idea.currentTime !== 0 ) {	idea.pause(); idea.currentTime = 0;	}

		if ( currentId === 'game' ) setTimeout(function(){ game.play(); }, 1000);
		if ( game.currentTime !== 0 ) {	game.pause(); game.currentTime = 0;	}

		timer = setTimeout(function() {

			$($items[counter]).fadeOut();
			$($buttons[counter]).removeClass('button_active');
			counter++;

			if( counter >= itemsLength ) counter = 0;

			if ( display.current === 'start' ) timeOut();

		}, durationTime);
	}





})();
