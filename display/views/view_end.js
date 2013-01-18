(function(){

	display.views.end = (function(){

		var left = '\
		<div class="main_content_wrap">\
			<div class="logo">\
				<img src="style/images/neurron_logo.png" alt="neurron logo" class="logo" />\
				<div class="subtitle">END OF THE TUNNEL</div>\
			</div>\
			<div id="score_wrap" class="score_wrap">\
				<div class="score_item">\
					<h2 id="teamname"></h2>\
					<div id="score_value" class="score_value box">\
						<h1></h1>\
					</div>\
				</div>\
				<div class="score_item">\
					<h2>partition</h2>\
					<div id="diagram" class="diagram box">\
						<ul>\
							<li class="red "></li>\
							<li class="blue"></li>\
							<li class="green"></li>\
							<li class="yellow"></li>\
							<li class="lila"></li>\
							<li class="orange"></li>\
							<li class="turkey"></li>\
							<li class="pink"></li>\
						</ul>\
					</div>\
				</div>\
				<div class="score_item">\
					<h2>league of legends ( <span id="category"></span> Player )</h2>\
					<div id="legends" class="legends box">\
						<table border="0" width="100%" cellpadding="3" cellspacing="0">\
						</table>\
					</div>\
				</div>\
			</div>\
		</div>';


		return { left: left };

	})();

	// cache
	var music, win,

		$qrCode,
		$qrCodeImage,
		$sideWrapper,
		$containerRight,
		$container;

	display.logic.end = function(){

		if ( !$qrCode )			$qrCode = $('#qr_code');
		if ( !$qrCodeImage )	$qrCodeImage = $('#qr_code img');
		if ( !$sideWrapper )	$sideWrapper = $('.side_wrapper');
		if ( !$containerRight ) $containerRight = $('#container-right');
		if ( !$container )		$container = $('#container');


		$qrCode.removeClass("marginTop");
		$qrCodeImage.removeClass("halfQR");
		$sideWrapper.removeClass("blueGradient");
		$containerRight.removeClass("marginTopPadding");
		$container.addClass("backgroundImage");

		if ( !music ) {

			win = display.getAsset('audio', 'win');
			win.volume = config.audioVolume/100;

			music = display.getAsset('audio', 'start');
			music.loop = true;
		}

		if ( config.audio ) win.play();

		display.sound( music );
	};

})();
