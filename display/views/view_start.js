(function(){

	display.views.start = (function(){

		var left = '\
		<div class="slider_content_wrap">\
			<div class="logo">\
				<img src="style/images/neurron_logo.png" alt="neurron logo" />\
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
						<video muted controls preload="auto" class="video">\
							<source src="assets/views/start/idea.mp4" type="video/mp4" />\
							<source src="assets/views/start/test.ogv" type="video/ogg" />\
							The browser doesn\'t support any of the provided formats...\
						</video>\
					</li>\
					<li id="game" class="screen hide">\
						<img src="assets/views/start/placeholder.jpg" class="video" />\
					</li>\
				</ul>\
			</div>\
		</div>';

		return { left: left	};

	})();


	// Cache
	var video, music,

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

		if ( video ) {

			start();

		} else { // first time

			music = display.getAsset('audio', 'start');
			music.loop = true;

			video = document.getElementById('idea').children[0];



			$buttons = $('#button_wrap > li');
			$items = $('#screen_wrap > li');
			$container = $('#container');
			$containerRight = $('#container-right');
			$qrCode = $('#qr_code > img');



			// event handler
			$($buttons).click(function(){

				if ( counter === $(this).index() ) return;

				$($buttons[counter]).removeClass('button_active');
				$($items[counter]).fadeOut();
				counter = $(this).index();
				if ( timer ) clearTimeout(timer);
				timeOut();
			});

			$(video).on('loadedmetadata', start );
			$(video).on('ended', function(){ document.getElementById('btn-game').click(); });
		}

		$container.addClass("backgroundImage");
		$containerRight.removeClass("marginTopPadding");
		$qrCode.removeClass("halfQR");
	};


	function start(){

		display.sound( music );

		duration = {

			idea	: ~~( video.duration * 1000 ) + 1000,
			game	: 15000,
			demo	: 15000
		};

		itemsLength = $items.length;

		counter = 0;

		timeOut();
	}

	//set time out
	function timeOut(){

		var currentId = $items[counter].id,

			durationTime = duration[currentId];

		$($items[counter]).fadeIn();
		$($buttons[counter]).addClass('button_active');

		if ( currentId === 'idea' ) setTimeout(function(){ video.play(); }, 1000);

		if ( video.currentTime !== 0 ) {

			video.pause();
			video.currentTime = 0;
		}

		timer = setTimeout(function() {

			$($items[counter]).fadeOut();
			$($buttons[counter]).removeClass('button_active');
			counter++;

			if( counter >= itemsLength ) counter = 0;

			if ( display.current === 'start' ) timeOut();

		}, durationTime);
	}





})();
