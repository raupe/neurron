(function(){

	display.views.load = (function(){

		var left = '\
		<div id="load_outerwrapper" class="load_outerwrapper">\
			<div id="load_innerwrapper" class="load_innerwrapper round">\
				<div id="load_teamname" class="load_teamname"></div>\
				<h2 class="load_heading">Control</h2>\
				<div id="tutorial" class="load_tutorial">\
					<video preload="auto" loop muted autoplay class="tutorial">\
						<source src="assets/views/load/tutorial.mp4" type="video/mp4" />\
						<source src="assets/views/load/tutorial.ogv" type="video/ogg" />\
						The browser doesn\'t support any of the provided formats...\
					</video>\
					<div class="caption">Swipe an arc to move (clock or counter-clockwise)</div>\
				</div>\
			</div>\
            <div class="load_hintbox round">\
				<div id="message" class="message">\
					<span>Player "Red" is entering the Team-Name. Still waiting</span>\
					<ul id="waiting" class="waiting"><li class="fadeIn">.</li><li>.</li><li>.</li><li>.</li></ul>\
				</div>\
				<div id="progressbar" class="load_progressbar hide">0 %</div>\
            </div>\
		</div>',

		right = '<div id="load_register_status" class="joined round"></div>';

		return { left: left, right: right };

	})();

	var joined,
		progressbar,
		message,
		animation,
		video,
		waiting,
		load_teamname;


	display.logic.load = function(){

		if ( !video ) {

			video = document.getElementById('tutorial').children[0];
			if ( !video ) {	setTimeout(function(){ display.logic.load(); }, 16.7 );	return; }
        }

        if ( !video.duration ) { setTimeout(function(){ display.logic.load(); }, 16.7 ); return; }

		if ( !waiting ) {

			waiting = document.getElementById('waiting');
			if ( !waiting ) { setTimeout(function(){ display.logic.load(); }, 16.7 ); return; }
		}

		var elements = waiting.children,
			length = elements.length,
			counter = 1;

		animation = setInterval(function(){

			if ( counter === length ) {

				for ( var i = 1; i < length; i++ ) elements[i].classList.remove('fadeIn');
				counter = 1;

			} else {

				elements[counter].classList.add('fadeIn');
				counter++;
			}

		}, 1000 );

		$('#container').removeClass("backgroundImage");
		$('#container-right').addClass("marginTopPadding");
		$('#qr_code > img').addClass("halfQR");
        $('#site').fadeOut(1000);
	};


	display.load_view.showNewPlayer = function ( id ) {

		if ( !joined ) {

			joined = document.getElementById('load_register_status');
			if ( !joined ) { setTimeout(function(){ display.load_view.showNewPlayer( id ); }, 16.7 ); return; }
		}

		var	pathToImages = config.viewAssets + '/load/icons/',
			image = new Image();

		image.onload = function(){ joined.appendChild(image); };
		image.src = pathToImages + 'neurron_' + id + '.png';
	};





	display.load_view.loadBar = function() {

		if ( !message ) {

			message = document.getElementById('message');
			if ( !message ) { setTimeout(function(){ display.load_view.loadBar(); }, 16.7 ); return; }
		}

        if ( !progressbar ) {

			progressbar = document.getElementById('progressbar');
			if ( !progressbar ) { setTimeout(function(){ display.load_view.loadBar(); }, 16.7 ); return; }
        }

		if ( animation ) clearInterval( animation );

		message.classList.add('hide');
		progressbar.classList.remove('hide');

		setTimeout(function(){ progressbar.classList.add('fill'); }, 16.7);

		var step = (15 * 1000 / 100) * 0.9, // css width .load_progressbar
			counter = 0,
			interval;

		interval = setInterval(function(){

			progressbar.textContent = ++counter + ' %';

			if ( counter === 100 ) clearInterval( interval );

		}, step );
	};

	display.load_view.greetTeam = function() {

		if ( !load_teamname ) {

			load_teamname = document.getElementById('load_teamname');
			if ( !load_teamname ) { setTimeout(function(){ display.load_view.greetTeam(); }, 16.7 ); return; }
		}

		var greetBox = document.createElement('h1');

		greetBox.id = 'load_greet';
		greetBox.className = 'greetings';

		greetBox.innerHTML = 'Hi ' + ( display.teamname ? 'team ' + display.teamname : 'neurrons' );
		load_teamname.appendChild(greetBox);
	};

	display.load_view.clearLoadScene = function(){

		if ( !load_teamname ) {

			load_teamname = document.getElementById('load_teamname');
			if ( !load_teamname ) { setTimeout(function(){ display.load_view.clearLoadScene(); }, 16.7 ); return; }
		}

		if ( !message ) {

			message = document.getElementById('message');
			if ( !message ) { setTimeout(function(){ display.load_view.clearLoadScene(); }, 16.7 ); return; }
		}

        if ( !progressbar ) {

			progressbar = document.getElementById('progressbar');
			if ( !progressbar ) { setTimeout(function(){ display.load_view.clearLoadScene(); }, 16.7 ); return; }
        }

		setTimeout(function(){ // delay for smoothness

			// remove images
			if ( joined ) joined.innerHTML = '';

			if ( load_teamname.innerHTML !== "" ) load_teamname.removeChild( document.getElementById('load_greet') ); // remove Team greeting

			if ( message.classList.contains('hide') ) message.classList.remove('hide');
			if ( !progressbar.classList.contains('hide') ) progressbar.classList.add('hide');
			if ( progressbar.classList.contains('fill') ) progressbar.classList.remove('fill');

			progressbar.textContent = '0 %';

		}, 1000 );
	};

})();
