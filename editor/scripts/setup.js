(function(){

	var input = document.getElementById('input'),
		controls = input.children[0],
		height = input.offsetHeight - controls.offsetHeight,

		display = document.getElementById('display-in'),
		width = display.offsetWidth,

		cvs = document.createElement('canvas'),
		ctx = cvs.getContext('2d');

	cvs.width = width - 1; // siehe border
	cvs.height = height - 1;
	cvs.id = 'canvas-in';

	display.appendChild( cvs );

})();
