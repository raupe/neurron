(function(){

	var Box = controller.Box = function() {

        var type = 'button',
            text = 'Start';

        this.width = 200;
        this.height = 100;
        this.left = 0;
        this.top = 0;

        this.disabled = false;


        this.createButton();

        this.set( type, text );
	};



    window.addEventListener('orientationchange', function() {

        document.getElementById('text').style['z-index'] = 1;

    }.bind(this) );




    Box.prototype.createButton = function(){

        var box = document.createElement('div');

        box.id = 'box';


        var text = document.createElement('div');

        text.id = 'text';

        box.appendChild( text );

        document.body.appendChild( box );
    };



	Box.prototype.click = function(){

        if ( !this.disabled ) { // no proper remove...

            this.manager.handle( config.commands.REGISTER );

            this.removeListener();
        }

    };


    Box.prototype.addListener = function(){

        this.disabled = false;

        document.getElementById('box').addEventListener('touchend', this.click.bind(this) );
    };


    Box.prototype.removeListener = function(){

        this.disabled = true;

        document.getElementById('box').removeEventListener('touchend', this.temp );
    };




    Box.prototype.set = function( type, text ){

        var box = document.getElementById('box');

        box.className = ( type === 'button' ) ? 'button' : 'label';

        box.className += ' show';

        document.getElementById('text').textContent = text;

        if ( type === 'button' ) {

            this.input.disable();

            this.addListener();
        }
    };


    Box.prototype.hide = function(){

       document.getElementById('box').className = ' hide';
    };



})();
