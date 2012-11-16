(function(){

    var Element = display.Element = function(){

        // global e.g. default for player
        this.size = config.elements.size;
    };


    Element.prototype.init = function ( config ) {

        this.setup( config );

        this.createCanvas();

        this.colorize();

        this.register();
    };


    Element.prototype.setup = function ( params ) {

        // assetManager     -> via prototype
        // screen           -> via prototype
        // grid             -> via prototype

        this.color = params.color;
        this.id = params.id;
        this.pos = params.pos;

        if ( params.size ) {

           this.size = params.size;
        }

        if ( params.visible ) {

            this.visible = params.visible;
        }


        this.check = false;

        this.origin = this.screen.ctx;

        this.src = this.assetManager.get('image', this.type );
    };


    Element.prototype.createCanvas = function(){

        var cvs = document.createElement('canvas'),
            ctx = cvs.getContext('2d');

        cvs.width = this.size;
        cvs.height = this.size;

        this.ctx = ctx;
    };


    Element.prototype.colorize = function(){

        // ToDo: improve flow

        setTimeout( function() {

            if ( this.color ) {

                this.ctx.drawImage( this.src, 0,0, this.size, this.size );


                var image = this.ctx.getImageData( 0, 0, this.size, this.size ),

                    size = image.width * image.height + 1,

                    pixels = image.data,

                    i;

                while ( --size ) {

                    i = size << 2;

                    pixels[   i ] = this.color[0];
                    pixels[ ++i ] = this.color[1];
                    pixels[ ++i ] = this.color[2];
                }

                this.ctx.putImageData( image, 0, 0 );


                image = new Image();

                image.src = this.ctx.canvas.toDataURL('img/png');

                this.src = image;
            }

        }.bind(this), 60 );
    };


    Element.prototype.register = function() {

        this.nextPos = this.pos;

        this.moving = false;

        this.counter = 0;

        this.field = this.grid.fields[ this.pos ];
    };


    Element.prototype.move = function ( nextPos ) {

        if ( nextPos === this.pos ) return;

        this.nextPos = nextPos;

        if ( !this.moving ) {

            this.moving = true;

            this.setDir();
        }
    };


    // check: uhrzeigersinn <- antiRing, gegen -> ring
    Element.prototype.setDir = function() {

        var nextPos = this.nextPos;

        if ( nextPos > this.pos ) {

            this.dir = ( nextPos - this.pos) < this.grid.lanes/2 ? 'antiRing' : 'ring';

        } else {

            this.dir = ( this.pos - nextPos ) > this.grid.lanes/2 ? 'antiRing' : 'ring';
        }
    };



    Element.prototype.update = function(){

        if ( this.moving ) {

            this.animate();
        }
    };



    Element.prototype.animate = function() {

        var field = this.grid.fields[ this.pos ],

            step = field[this.dir][ ~~this.counter ]; // allow floats

        this.field = step;

        this.counter += this.velocity;


        if ( this.counter >= field[this.dir].length ) { // allow higher multiplicators

            this.counter = 0;

            if ( this.dir === 'ring' ) {

                if ( this.pos%this.grid.lanes === 0 ) {

                    this.pos += (this.grid.lanes - 1);

                } else {

                    this.pos--;
                }

            } else {

                if ( this.pos%this.grid.lanes === this.grid.lanes-1) {

                    this.pos -= (this.grid.lanes - 1);

                } else {

                    this.pos++;
                }
            }

            if ( this.nextPos !== this.pos ) {

                this.setDir();

            } else {

                this.moving = false;
            }
        }
    };


    Element.prototype.draw = function() {

        var field = this.field;

        // // degree is saved per field
        field.deg = this.counter;

        this.rotate( field.deg );

        this.origin.drawImage(

                        this.img,
                        field.x - this.size/2,
                        field.y - this.size/2,
                        this.size,
                        this.size
                    );
    };



    Element.prototype.rotate = function ( deg ) {

        var ctx = this.ctx;

        ctx.save();

            ctx.translate( ctx.canvas.width/2 - this.size/2,
                           ctx.canvas.height/2 - this.size/2 );

            ctx.rotate( deg * Math.PI / 180 ); // rad

            ctx.clearRect( 0, 0, this.size, this.size ); // keep alpha != overdraw

            ctx.drawImage( this.src, 0,0, this.size, this.size );

        ctx.restore();

        this.img = ctx.canvas;
    };



})();
