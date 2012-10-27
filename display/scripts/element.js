(function(){

    var Element = display.Element = function(){ };


    Element.prototype.setup = function ( config ) {

        this.pool = config.pool;
        this.id = config.id;
        this.screen = config.screen;
        this.ctx = this.screen.ctx;
        this.grid = config.screen.grid;

        this.size = config.size;
        this.pos = config.pos;


        // subcanvas
        var cvs = document.createElement('canvas'),
            ctx = cvs.getContext('2d');

        cvs.width = this.size;
        cvs.height = this.size;

        this.sub = ctx;
        this.src = this.assets.images[ this.type ]; // image src
    };



    Element.prototype.register = function() {

        this.pool[this.id] = this; // add themselve to pool

        this.nextPos = this.pos;
        this.moving = false;

        this.counter = 0;

        this.screen.elements.push( this );
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

        var field = this.grid.fields[ this.pos ];

        if ( this.nextPos === this.pos ) {

            this.draw( field );

        } else {

            this.animate( field );
        }
    };


    Element.prototype.animate = function ( field ) {

        var step = field[this.dir][ this.counter ];

        this.draw( step );

        this.counter++;

        if ( this.counter === field[this.dir].length ) {

            this.pos = this.nextPos;
            this.moving = false;
            this.counter = 0;
        }
    };


    Element.prototype.draw = function( field ) {

        // degree is saved per field
        field.deg = this.counter;

        this.rotate( field.deg );

        this.ctx.drawImage(

                        this.img,
                        field.x - this.size/2,
                        field.y - this.size/2,
                        this.size,
                        this.size
                    );
    };


    Element.prototype.rotate = function ( deg ) {

        var rad = deg * Math.PI / 180;

        this.sub.save();

            this.sub.translate( this.sub.canvas.width/2 - this.size/2,
                                this.sub.canvas.height/2 - this.size/2 );

            this.sub.rotate( rad );

            this.sub.clearRect( 0, 0, this.size, this.size ); // prevent over draw

            this.sub.drawImage( this.src, 0,0, this.size, this.size );

        this.sub.restore();

        this.img = this.sub.canvas;
    };


    Element.prototype.remove = function () {

        delete this.pool[this.id];
    };

})();
