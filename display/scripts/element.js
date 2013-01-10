(function(){

    // ToDo: check why created two instances first ( should get sice, checkMove )
    var Element = display.Element = function(){};


    Element.prototype.init = function ( params ) {

        this.checkMove = config.duration.moveTime / this.velocity / this.grid.frames;

        this.setup( params );

        this.register();
    };


    Element.prototype.setup = function ( params ) {

        // screen           -> via prototype
        // grid             -> via prototype
        this.getAsset = display.getAsset;

        this.id = params.id;
        this.pos = params.pos;


        if ( params.size ) this.size = params.size;

        if ( params.visible ) this.visible = params.visible;


        this.diffMove = 0;
        this.diffAni = 0;

        this.check = false;

        this.origin = this.screen.ctx;


        this.spriteCounter = 0;

		this.checkAni = this.getStep();

        this.originSprites = this.getAsset('image', this.type );

        this.spriteImages = this.originSprites;

        this.src = ( this.spriteImages instanceof Array ) ? this.spriteImages[0] : this.spriteImages;
    };


    Element.prototype.getStep = function(){

        var ms;

        if ( this.type === 'damage' )   ms = config.obstacles[1].frameDuration || config.frameDuration;
        if ( this.type === 'heal' )     ms = config.obstacles[2].frameDuration || config.frameDuration;
        if ( this.type === 'points' )   ms = config.obstacles[3].frameDuration || config.frameDuration;
        if ( this.isPlayer )            ms = config.frameDuration + this.id * 15;

        return ms;
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

        this.diffMove += delta;
        this.diffAni += delta;

        // animation
        while ( this.diffAni >= this.checkAni ) {

            this.diffAni -= this.checkAni;

            this.changeSprite();
        }

        // movement
        while ( this.diffMove >= this.checkMove ) {

            this.diffMove -= this.checkMove;

            if ( this.moving ) this.animate();
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

        var field = this.field,
            x = field.x + this.grid.getTranslateX(field.radius),
            y = field.y + this.grid.getTranslateY(field.radius);

        this.origin.save();

            this.origin.translate( x , y );

            this.origin.rotate( field.angle );

            this.origin.translate( -x , -y );

            this.origin.drawImage(

                            this.src,
                            x - this.size/2 * field.scale,
                            y - this.size/2 * field.scale,
                            this.size * field.scale,
                            this.size * field.scale
                        );

        this.origin.restore();
    };


    Element.prototype.resize = function(){

        this.field = this.grid.fields[ this.pos ];
    };

})();
