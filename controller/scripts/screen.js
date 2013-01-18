(function(){

	controller.Screen = (function(){

		var cvs = document.getElementById('cvs'),
			ctx = cvs.getContext('2d'),

			setStyle = null;

		// ---- private -----
		function scale() {

			cvs.width = window.innerWidth;
			cvs.height = window.innerHeight;
			if ( setStyle ) setStyle();
		}


		// ---- public -----
		var init = function ( param ) {

			scale();

			setStyle = param;

			window.addEventListener('resize', scale );
			window.addEventListener('orientationchange', scale );
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




