(function(){

	var left = document.getElementById('container-left'),
		right = document.getElementById('container-right');


	display.show = function ( view ) {

		view = display.views[view];

		left.innerHTML	= view[0];
		right.innerHTML	= view[1];
	};

})();
