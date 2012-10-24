(function(){

    display.Element = {

        register: function(){

            this.pool[this.id] = this; // add themselve to pool

            this.nextPos = this.pos = 20;//20;
            this.moving = false;

            this.counter = 0;

            this.screen.elements.push( this );

            this.size = 10;
            this.color = 'blue';
        },

        draw: function(){

            var ctx = this.ctx,

                field = this.grid.fields[ this.pos ];

            ctx.fillStyle = this.color;


            if ( this.nextPos === this.pos ) {

                ctx.fillRect( field.x - this.size/2, field.y - this.size/2, this.size, this.size );

            } else {

                this.animate();
            }
        },

        move: function ( direction ) {

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

        },

        animate: function() {

            var ctx = this.ctx,
                field = this.grid.fields[ this.pos ],
                step = field[this.dir][ this.counter ];

            ctx.fillRect( step.x - this.size/2, step.y - this.size/2, this.size, this.size );

            this.counter++;

            if ( this.counter === field[this.dir].length ) {

                this.pos = this.nextPos;
                this.moving = false;
                this.counter = 0;
            }
        },

        remove: function () {

            delete this.pool[this.id];
        }
    };

})();
