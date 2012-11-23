(function(){

	var Button = controller.Button = function() {

        this.type = 'button';
		this.text = 'Start';
        this.width = 200;
        this.height = 100;
        this.left = 0;
        this.top = 0;

        this.createButton();

		this.init();
	};


    Button.prototype.createButton = function(){

        var box = document.createElement('div');

            box.id = 'box';

            if( this.type === 'button'){

                box.className = 'button';

            }else{

                box.className = 'label';
            }

        var textBox = document.createElement('div');

            textBox.innerHTML = this.text;
            textBox.id = 'textBox';


        this.setStyle( box );

        box.appendChild( textBox );

        box.addEventListener('touchend', this.click.bind(this) );

        document.body.appendChild( box );
    };


    Button.prototype.setStyle = function ( box ) {

        this.scale();

        this.pos();

        box.setAttribute( 'style',

            'width: '+this.width+'px; ' +
            'height: '+this.height+'px; ' +
            'left:'+this.left+'px; ' +
            'top:'+this.top+'px;'
        );
    };



    Button.prototype.init = function(){

        this.input.disable();
	};



    window.addEventListener("orientationchange", function() {

        var box = document.getElementById('box');

        // box.parentNode.removeChild( box );

        this.init();

        this.setStyle( box );

    }.bind(this), false);


    Button.prototype.scale = function(){

        this.width = Math.round(window.innerWidth/2);

        this.height = Math.round(window.innerHeight/2);
    };


    Button.prototype.pos = function(){

        this.left = Math.round((window.innerWidth/2) - (this.width/2));

        this.top = Math.round(window.innerHeight/2) - (this.height/2);
    };


	Button.prototype.click = function(){

        this.manager.handle( config.commands.REGISTER );
    };


    Button.prototype.trigger = function(){

        this.input.enable();

		this.hide();
    };


	Button.prototype.hide = function(){

		var box = document.getElementById('box');
        // console.log(box);
        box.setAttribute( 'style', 'display: none;' );
	};


    Button.prototype.set = function( type, text ){

        this.type = type;

        this.text = text;

        var box = document.getElementById('start');

        var textBox = document.getElementById('textBox');

        textBox.innerHTML = this.text;

        if( this.type === 'button') {

            box.setAttribute( 'style', 'display: block;' );

        } else{

        }
    };

})();
