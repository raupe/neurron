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

        //this.Button.disable();

		var box = document.createElement('div');

        if( this.type === 'button'){

		    box.className = 'button';
            box.id = 'start';
        }else{

            box.className = 'label';
        }

        var textBox = document.createElement('div');
        textBox.id = 'textBox';
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

		box.addEventListener('touchend', this.start.bind(this) );

		document.body.appendChild( box );
	};

    window.addEventListener("orientationchange", function() {

        box.parentNode.removeChild( box );
        this.init();

    }.bind(this), false);

    Button.prototype.scale = function(){

        this.width = Math.round(window.innerWidth/2);

        this.height = Math.round(window.innerHeight/2);

    };

    Button.prototype.pos = function(){

        this.left = Math.round((window.innerWidth/2) - (this.width/2));

        this.top = Math.round(window.innerHeight/2) - (this.height/2);
    };

	Button.prototype.start = function(){


		this.manager.start();

        //this.Button.enable();

		this.hide(); // later: in callback
	};


	Button.prototype.hide = function(){

		var box = document.getElementById('start');

			countdown = 1000;

		setTimeout(function(){

            box.setAttribute(
                'style',
                'display: none;'
            );

		}.bind(this), countdown);

        this.set( 'button', 'no');
	};

    Button.prototype.set = function( type, text ){

        this.type = type;

        this.text = text;

        var box = document.getElementById('start');

        var textBox = document.getElementById('textBox');

        textBox.innerHTML = this.text;

        if( this.type === 'button') {

            box.setAttribute(
                'style',
                'display: block;'
            );
        }else{

        }
    };

})();
