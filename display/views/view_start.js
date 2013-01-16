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
					<li class="button button_color idea_button"><p>idea</p></li>\
					<li class="button button_color game_button"><p>game</p></li>\
					<li class="button button_color demo_button"><p>demo</p></li>\
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
						<img src="http://company.zynga.com/nfs/files-0925-01/coasterville_flat_0.png" class="video" />\
					</li>\
					<li id="demo" class="screen hide">\
						<img src="http://www.pc-games-blog.net/wp-content/uploads/2012/10/League_of_Legends_lan-600x351.jpg" class="video" />\
					</li>\
				</ul>\
			</div>\
		</div>';

		return { left: left	};

	})();


	// Cache
	var video, music;

	display.logic.start = function(){

		$('#container').addClass("backgroundImage");
		$('#container-right').removeClass("marginTopPadding");
		$('#qr_code > img').removeClass("halfQR");

		if ( video ) {

			start();

		} else { // first time

			if ( display.getAsset ) {

				music = display.getAsset('audio', 'start');
				music.loop = true;
			}

			video = document.getElementById('idea').children[0];

			$(video).on('loadedmetadata', start );
		}
	};


	function start(){

		if ( display.getAsset ) display.sound( music );

		var duration = {

				idea	: ~~( video.duration * 1000 ) + 1000,
				game	: 15000,
				demo	: 15000
			},

			$buttons = $("#button_wrap > li"),
			$items = $("#screen_wrap > li"),

			itemsLength = $items.length,

			counter = 0,
			timer;


		$($buttons).click(function(){

			$($buttons[counter]).removeClass('button_active');
			$($items[counter]).fadeOut();
			counter = $(this).index();
			clearTimeout(timer);
			timeOut();
		});


		//set time out
		var timeOut = function(){

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

				timeOut();

			}, durationTime);
		};

		timeOut();
	}


})();
