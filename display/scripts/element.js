(function(){

    var Element = display.Element = function(){

        // ToDo: check why created two instances first ( should get sice, checkMove )
    };


    Element.prototype.init = function ( params ) {

        // global e.g. default for player
        this.size = config.elements.size;

        this.checkMove = config.duration.moveTime / this.velocity / this.grid.frames;


        this.setup( params );

        this.createCanvas();

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


        this.spriteCounter = 0;

        this.stepper = 10;

        this.spriteImages = this.assetManager.get('image', this.type );

        this.src = ( this.spriteImages instanceof Array ) ? this.spriteImages[0] : this.spriteImages;
    };


    Element.prototype.createCanvas = function(){

        var cvs = document.createElement('canvas'),
            ctx = cvs.getContext('2d');

        cvs.width = this.size;
        cvs.height = this.size;

        this.ctx = ctx;
    };


    Element.prototype.register = function() {

        this.nextPos = this.pos;

        this.moving = false;

        this.counter = 0;

        this.field = this.grid.fields[ this.pos ];
    };


    Element.prototype.move = function ( nextPos ) {

        if ( nextPos === this.nextPos ) return;

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

            if ( !--this.stepper ) {

                this.stepper = 4;

                this.changeSprite();
            }


            if ( this.moving ) {

                this.animate();
            }
        }
    };


    Element.prototype.changeSprite = function(){

        if ( this.spriteImages instanceof Array ) {

            this.spriteCounter = ( this.spriteCounter+1 < this.spriteImages.length ) ? this.spriteCounter+1 : 0;

            this.src = this.spriteImages[ this.spriteCounter ];
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

            this.counter += 1;
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

})();
