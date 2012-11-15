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


    Element.prototype.setup = function ( config ) {

        // assetManager     -> via prototype
        // screen           -> via prototype
        // grid             -> via prototype

        this.color = config.color;
        this.id = config.id;
        this.pos = config.pos;

        if ( config.size ) {

           this.size = config.size;
        }

        if ( config.visible ) {

            this.visible = config.visible;
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

        }.bind(this), 12 );
    };


    Element.prototype.register = function() {

        this.nextPos = this.pos;

        this.moving = false;

        this.counter = 0;

        this.field = this.grid.fields[ this.pos ];
    };


    Element.prototype.move = function ( direction ) {

        // 4: left, 5: top, 3: right, 6: down
        var change = ( direction === 4 || direction === 5 ) ? 1 : -1;


        // left - right
        if ( direction === 3 || direction === 4 ) {

            this.dir = ( direction === 4 ) ? 'antiRing' : 'ring';


            if ( direction === 4 ) { // edge case: 39 -> 20

                if ( ( this.pos+change ) % this.grid.lanes === 0 ) {

                    change -= this.grid.lanes * ( ( this.pos+change + 1 ) % this.grid.lanes );
                }
            }


            if ( direction === 3 ) { // edge case: 20 -> 39

                if ( (this.pos+change+1) % this.grid.lanes === 0 ) {

                    change += this.grid.lanes;
                }
            }
        }


        // up - down
        if ( direction === 5 || direction === 6 ) {

            this.dir = ( direction === 5 ) ? 'dist' : 'antiDist';

            change = ( direction === 5 ) ?  change + this.grid.lanes - 1 :
                                            change - this.grid.lanes + 1;
        }


        // position exists
        if ( this.grid.fields[ this.pos + change ] ) {

            this.nextPos += change;
            this.moving = true;
        }

    };




    Element.prototype.update = function(){

        if ( this.nextPos !== this.pos ) {

            this.animate();
        }
    };



    Element.prototype.animate = function() {

        var field = this.grid.fields[ this.pos ],

            step = field[this.dir][ ~~this.counter ]; // allow floats

        this.field = step;

        this.counter += this.velocity;

        if ( this.counter >= field[this.dir].length ) { // allow higher multiplicators

            this.pos = this.nextPos;
            this.moving = false;
            this.counter = 0;
        }
    };


    Element.prototype.draw = function() {

        var field = this.field;

        // // degree is saved per field
        // field.deg = this.counter;

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
