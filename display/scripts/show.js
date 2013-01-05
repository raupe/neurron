(function(){

	// handle visuals

	var containerLeft = document.getElementById('container-left'),
		containerRight = document.getElementById('container-right');

	display.current = null;

	display.show = function ( id ) {

		var left, right,
			view = display.views[ id ],
			temp;

		if ( display.current ) {

			left = document.getElementById( display.current + '-l' );
			if ( left ) $(left).toggleClass('show hide');

			right = document.getElementById( display.current + '-r' );
			if ( right ) $(right).toggleClass('show hide');
		}

		display.current = id;


		left = document.getElementById( id + '-l' );
		right = document.getElementById( id + '-r' );

		if ( left ) {

			$(left).toggleClass('show hide');

		} else if ( view && view.left ) {

			temp = document.createElement('div');
			temp.innerHTML = view.left;
			temp.id = id + '-l';
			temp.className = 'wrapper show';
			containerLeft.appendChild( temp );
		}

		if ( right ) {

			$(right).toggleClass('show hide');

		} else if ( view && view.right ) {

			temp = document.createElement('div');
			temp.innerHTML = view.right;
			temp.id = id + '-r';
			temp.className = 'wrapper show';
			containerRight.appendChild( temp );
		}


		if ( display.logic[ id ] ) display.logic[ id ]();
	};



	// handle audio

	display.tracks = {

		current	: null,
		next	: null
	};

	var audioVolume = config.audioVolume/100,
		diff = ~~(config.audioVolume / config.audioFading + 0.5) / 100,
		timer;


	display.sound = function ( el ) {

		var tracks = display.tracks,
			current = tracks.current;

		if ( !current ) { // just play

			current = tracks.current = el;

			current.currentTime = 0;
			current.volume = audioVolume;

			current.play();

		} else { // fading

			tracks.next = el;
			tracks.next.volume = 0;

			timer = config.audioFading;

			fade();

			tracks.next.play();
		}
	};


	function fade(){

		var current = display.tracks.current,
			next = display.tracks.next;

		current.volume = Math.max( current.volume - diff, 0 );
		next.volume = audioVolume - timer * diff;

		if ( timer-- ) {

			setTimeout( fade, 1000 );

		} else {

			display.tracks.current = next;
		}
	}

})();
