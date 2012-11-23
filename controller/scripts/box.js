(function(){

	var Box = controller.Box = function() {

        var type = 'button',
            text = 'Start';

        this.width = 200;
        this.height = 100;
        this.left = 0;
        this.top = 0;

        this.createButton();

		this.init();

        this.set( type, text );
	};


    Box.prototype.createButton = function(){

        var box = document.createElement('div');

        box.id = 'box';


        var text = document.createElement('div');

        text.id = 'text';



        this.setStyle( box );


        box.appendChild( text );

        document.body.appendChild( box );

        box.addEventListener('touchend', this.click.bind(this) );

    };


    Box.prototype.setStyle = function ( element ) {

            // scale
        var width = Math.round(window.innerWidth/2),
            height = Math.round(window.innerHeight/2),

            // pos
            left = Math.round((window.innerWidth/2) - (this.width/2)),
            top = Math.round(window.innerHeight/2) - (this.height/2);

        element.setAttribute( 'style',

            'width: '+ width +'px; ' +
            'height: '+ height +'px; ' +
            'left:'+ left +'px; ' +
            'top:'+ top +'px;'
        );
    };



    Box.prototype.init = function(){

        this.input.disable();
	};



    window.addEventListener("orientationchange", function() {

        var box = document.getElementById('box');

        this.setStyle( box );

    }.bind(this), false);



	Box.prototype.click = function(){

        this.manager.handle( config.commands.REGISTER );

        this.input.enable();

        this.hide();
    };



    Box.prototype.set = function( type, text ){

        var box = document.getElementById('box');

        document.getElementById('text').innerText = text;

        // this.style();
        box.setAttribute( 'style', 'display: block;'  );

        box.className = ( type === 'button' ) ? 'button' : 'label';
    };


    Box.prototype.hide = function(){

       var box = document.getElementById('box');

       box.setAttribute( 'style', 'display: none;' );
    };


})();
