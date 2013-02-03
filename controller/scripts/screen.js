(function(){

	window.onload = function(){	setTimeout(function(){ window.scrollTo(0,1); }, 16.7 );};

	controller.Screen = (function(){

		var cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d'),
			setStyle = null;

		cvs.className = 'background default';


		// ---- private -----
		function scale() {

			cvs.width = window.innerWidth;
			cvs.height = window.innerHeight;
			if ( setStyle ) setStyle();
		}


		// ---- public -----
		var init = function ( style ) {

			scale();

			setStyle = style;

			window.addEventListener('resize', scale );
			window.addEventListener('orientationchange', scale );

			document.getElementById('background').appendChild( cvs );
		};

		var clear = function(){

			ctx.save();
			ctx.clearRect( 0 , 0 , cvs.width, cvs.height );
			ctx.restore();
		};

		// Interface
		var Screen = {

			cvs		: cvs,
			ctx		: ctx,
			init	: init,
			clear	: clear
		};

		return Screen;

	})();


})();




