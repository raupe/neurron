(function(){

	var Input = controller.Input = function ( config ) {

		this.cvs = config.canvas;


		this.listen();
	};


	Input.prototype.listen = function(){

		var cvs = this.cvs;

		cvs.addEventListener('click', function(e){

			console.log(e);
		});

	};

	/* calculates relative position */
	Input.prototype.pos = function(){


	};



})();
