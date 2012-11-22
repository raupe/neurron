(function(){

    var Element = display.Element = function(){

        // ToDo: check why created two instances first ( should get sice, checkMove )
    };


    Element.prototype.init = function ( params ) {

        // global e.g. default for player
        this.size = config.elements.size;

        this.checkMove = config.duration.moveTime / this.grid.frames;




        this.setup( params );

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


        this.diff = 0;

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


    Element.prototype.update = function ( delta ) {
    	
        this.diff += delta;

        while ( this.diff >= this.checkMove ) {

            this.diff -= this.checkMove;

            if ( this.moving ) {

                this.animate();
            }
        }

    };



    Element.prototype.animate = function() {

		var field = this.grid.fields[ this.pos ];

        if ( this.counter >= field[this.dir].length ) { // allow higher multiplicators

            this.counter = 0;

            this.change();

            this.field = this.grid.fields[ this.pos ]; // after change

        } else {

            this.field = field[this.dir][ ~~this.counter ]; // allow floats

            this.counter += this.velocity;
        }
    };




    Element.prototype.draw = function() {

        var field = this.field;

        this.origin.save();

            this.origin.translate( field.x , field.y );

            this.origin.rotate( field.angle );

            this.origin.translate( -field.x , -field.y);

            this.origin.drawImage(

                            this.src,
                            field.x - this.size/2 * field.scale,
                            field.y - this.size/2 * field.scale,
                            this.size * field.scale,
                            this.size * field.scale
                        );

        this.origin.restore();
    };



    Element.prototype.rotate = function ( deg ) {

        var ctx = this.ctx;

        ctx.save();

            ctx.clearRect( 0, 0, this.size, this.size ); // keep alpha != overdraw
            // ctx.translate( ctx.canvas.width/2 - this.size/2,
            //                ctx.canvas.height/2 - this.size/2 );

            ctx.rotate( deg );//;// * Math.PI / 180 ); // rad
            // ctx.rotate( Math.PI / 4 );// * Math.PI / 180 ); // rad


            ctx.drawImage( this.src, 0,0, this.size, this.size );

        ctx.restore();

        this.img = ctx.canvas;
    };



})();
