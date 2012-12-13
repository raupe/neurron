(function(){

	var clear = document.getElementById('clear'),
		random = document.getElementById('random'),

		total = document.getElementById('total'),

		players = document.getElementById('players'),
		playersDisplay = document.getElementById('players-display'),

		red = document.getElementById('red'),
		green = document.getElementById('green'),
		yellow = document.getElementById('yellow'),
		white = document.getElementById('white'),
		black = document.getElementById('black'),

		cIn = document.getElementById('canvas-in'),

		result = document.getElementById('result');



	clear.addEventListener('click', editor.clear );
	random.addEventListener('click', editor.random );
	result.addEventListener('click', editor.select );

	// offset.addEventListener('change', update );
	red.addEventListener('change', update );
	green.addEventListener('change', update );
	yellow.addEventListener('change', update );
	white.addEventListener('change', update );
	black.addEventListener('change', update );

	var width = editor.width;

	// cIn.addEventListener('click', function ( e ) {

	//	var pos = getPos(e),
	//		tiles = editor.tiles;

	//	// console.log(tiles);
	//	// for ( var i = 0, l = tiles.length; i < l; i++ ) {

	//	//	if ( tiles[i].x >= pos.x && tiles[i.x]+width ) {

	//	//		console.log(i);
	//	//	}

	//	// }
	// });



	function getPos ( e ) {


		if ( e.pageX || e.pageY ) {

			x = e.pageX;
			y = e.pageY;

		} else {

			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		return {

			x	: x,
			y	: y
		};
	}






	var playerElements = players.children,
		current = editor.players;

	players.addEventListener('click', function ( e ) {

		var trg = e.target;

		if ( trg.nodeName === 'LI' ) {

			playerElements[ current-1 ].className = 'box';

			current = trg.textContent;

			trg.className = 'box active';

			editor.players = current;

			editor.random();
		}

	});




	var colors = Object.keys( editor.colors );

	function update ( e ) {

		var trg = e.currentTarget,
			val = trg.value,
			type = trg.id,
			amount = 0;

		editor.colors[ type ] = parseInt( val, 10 );

		for ( var i = 0, l = colors.length; i < l; i++ ) {

			amount += editor.colors[ colors[i] ];
		}

		editor.total = amount;
		total.textContent = amount;

		editor.random();
	}


	editor.random();

})();
