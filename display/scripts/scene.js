(function(){

	// handle visuals
	var containerLeft = document.getElementById('container-left'),
		containerRight = document.getElementById('container-right');


	display.current = null;

	display.show = function ( id ) {

		var left, right,
			view = display.views[ id ],
			check = 0,
			temp;

		if ( display.current ) {

			left = document.getElementById( display.current + '-l' );
			right = document.getElementById( display.current + '-r' );

			if ( left ) {

				check++;

				left.classList.remove('fadeIn');
				left.classList.add('fadeOut');
				left.addEventListener( transitionend, hide );
			}

			if ( right ) {

				check++;

				right.classList.remove('fadeIn');
				right.classList.add('fadeOut');
				right.addEventListener( transitionend, hide );
			}

		} else {

			show();
		}

		display.current = id;


		function hide ( e ) {

			var el = e.currentTarget;

			el.classList.remove('fadeOut');
			el.classList.add('hide');

			el.removeEventListener( transitionend, hide );

			if ( !--check ) show(); // as both triggered
		}


		function show(){

			left = document.getElementById( id + '-l' );
			right = document.getElementById( id + '-r' );

			if ( left ) {

				left.classList.remove('hide');
				setTimeout(function(){ left.classList.add('fadeIn'); }, 16.7 );

			} else if ( view && view.left ) {

				temp = document.createElement('div');
				temp.innerHTML = view.left;
				temp.id = id + '-l';
				temp.className = 'wrapper show';
				containerLeft.appendChild( temp );

				setTimeout(function(){

					document.getElementById( id + '-l' ).classList.add('fadeIn');

				}, 16.7 );
			}

			if ( right ) {

				right.classList.remove('hide');
				setTimeout(function(){ right.classList.add('fadeIn'); }, 16.7 );

			} else if ( view && view.right ) {

				temp = document.createElement('div');
				temp.innerHTML = view.right;
				temp.id = id + '-r';
				temp.className = 'wrapper show';
				containerRight.appendChild( temp );

				setTimeout(function(){

					document.getElementById( id + '-r' ).classList.add('fadeIn');

				}, 16.7 );
			}

			if ( display.logic[ id ] ) display.logic[ id ]();
		}
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

		if ( current ) { // fading

			var next = tracks.next = el;
			next.volume = 0;

			timer = config.audioFading;
			fade();

			next.play();

		} else { // init

			current = tracks.current = el;

			current.currentTime = 0;
			current.volume = config.audio ? audioVolume : 0;

			current.play();
		}
	};


	function fade(){

		var current = display.tracks.current,
			next = display.tracks.next;

		current.volume = Math.max( current.volume - diff, 0 );
		if ( config.audio )	next.volume = audioVolume - timer * diff;

		if ( timer-- ) {

			setTimeout( fade, 1000 );

		} else {

			display.tracks.current = next;
		}
	}

})();
