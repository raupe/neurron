(function(){

	var Button = controller.Button =  function ( text ) {

		this.text = text;

		this.init();
	};



	Button.prototype.init = function(){

		var box = document.createElement('div');

		box.id = 'start';
		box.className = 'button';

		box.innerHTML = this.text;

		box.addEventListener('click', this.onclick.bind(this) );

		document.body.appendChild( box );
	};


	Button.prototype.onclick = function(){

		this.manager.start();


		this.remove(); // later: in callback
	};


	Button.prototype.remove = function(){

		var box = document.getElementById('start'),

			countdown = 1000;


		setTimeout(function(){

			box.parentNode.removeChild( box );

			this.input.started = true;

		}.bind(this), countdown);
	};

})();
