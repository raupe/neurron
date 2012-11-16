(function(){

	var Button = controller.Button =  function ( type, text ) {

        this.type = type;
		this.text = text;
        this.width = 200;
        this.height = 100;
        this.left = 0;
        this.top = 0;

		this.init();
	};



	Button.prototype.init = function(){

		var box = document.createElement('div');
		box.id = 'start';

        if( this.type === 'button'){

		    box.className = 'button';
        }else{

            box.className = 'label';
        }

        var textBox = document.createElement('div');
        textBox.className = 'textBox';
        textBox.innerHTML = this.text;

        box.appendChild( textBox );
        this.scale();

        this.pos();

        box.setAttribute(
            'style',
            'width: '+this.width+'px; ' +
            'height: '+this.height+'px; ' +
            'left:'+this.left+'px; ' +
            'top:'+this.top+'px;'
        );

		box.addEventListener('touchend', this.onclick.bind(this) );

		document.body.appendChild( box );
	};

    window.addEventListener("orientationchange", function() {

        box.parentNode.removeChild( box );
        this.init();

    }.bind(this), false);

    Button.prototype.scale = function(){

        this.width = Math.round(window.innerWidth/2);

        this.height = Math.round(window.innerHeight/2);

    }

    Button.prototype.pos = function(){

        this.left = Math.round((window.innerWidth/2) - (this.width/2));

        this.top = Math.round(window.innerHeight/2) - (this.height/2);
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
