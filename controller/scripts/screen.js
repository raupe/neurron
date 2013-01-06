(function(){

	controller.Screen = (function(){

		var cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d'),
			input;

		function init ( param ) {

			input = param;
		}

		function scale() {

			cvs.width = window.innerWidth;
			cvs.height = window.innerHeight;
			if ( input ) input.setStyle();
		}

		function clear (){

			ctx.save();
			ctx.clearRect( 0 , 0 , cvs.width, cvs.height );
			ctx.restore();
		}


		scale();

		document.body.appendChild( cvs );

		window.addEventListener('resize', scale );
		window.addEventListener('orientationchange', scale );

		return {

			init	: init,
			cvs		: cvs,
			ctx		: ctx,
			clear	: clear
		};

	})();


})();




