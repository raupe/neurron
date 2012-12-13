(function(){

	var cvs = document.getElementById('canvas-in'),
		ctx = cvs.getContext('2d'),

		colors = Object.keys( editor.colors ),
		l = colors.length,

		height = editor.height,
		rows = editor.rows,

		result = document.getElementById('result');


	function clear(){

		ctx.clearRect( 0, 0, cvs.width, cvs.height );
		result.value = '';
	}




	//editor.laneCode[ editor.players ] - editor.offset * editor.players,
	var width = editor.width = cvs.width / 16,
		text = '',
		color;



	function random(test) {

		clear();

		var bag = new ShuffleBag(),

			current;

		for ( var i = 0; i < l; i++ ) {

			current = editor.colors[ colors[i] ];

			// removing from the bag
			// 0,1,2,3 -~? 4 ???, h'ngt sich bei 3 af -> prioblem bei dem feld was gelert wird...
			if ( current > 0 ) {

				bag.add( colors[i], current );
			}
		}


		text = '';

		for ( var y = 0, my = rows; y < my; y++ ) {

			for ( var x = 0, mx = editor.laneCode[ editor.players ]; x < mx; x++ ) {

				color = bag.next();

				ctx.fillStyle = color;
				ctx.fillRect( x * width, y * height, width, height );

				text += editor.colorCode[ color ];
			}

			text += '\n';
		}

		result.value = text;
	}



	function select ( e ) {

		var trg = e.currentTarget;

		trg.select();
	}




	editor.clear = clear;
	editor.random = random;
	editor.select = select;

})();
