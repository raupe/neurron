(function(){

    display.Element = {

        register: function(){

            this.pool[this.id] = this; // add themselve to pool of players

            this.nextPos = this.pos = 20;

            this.counter = 0;

            this.screen.elements.push( this );

            // console.log(this.pos.x, this.pos.y);
            // console.log(this.pool);
            this.size = 10;
            this.color = 'blue';
        },

        draw: function(){

            var ctx = this.ctx,

                field = this.grid.fields[ this.pos ];

            ctx.fillStyle = this.color;

            if ( this.nextPos === this.pos ) {
                // console.log(this.nextPos, this.pos);

                ctx.fillRect( field.x - this.size/2, field.y - this.size/2, this.size, this.size);

            } else {

                this.animate();
            }
        },

        move: function ( direction, change ) {

            if ( direction === 'ctrl' ) {

                this.dir = ( change > 0 ) ? 'antiRing' : 'ring';

                if ( (this.pos+change) % (this.grid.lanes-1) === 0 ) {
                    console.log(this.pos);
                    // change = ( change > 0 ) ?   -(change + this.grid.lanes) :
                                                // change - this.grid.lanes;
                }
            }

            if ( direction === 'shift' ) {

                this.dir = ( change > 0 ) ? 'dist' : 'antiDist';
                change = ( change > 0 ) ?   change + this.grid.lanes - 1 :
                                            change - this.grid.lanes + 1;
            }


            this.nextPos += change;
        },

        animate: function() {

            var ctx = this.ctx,

                field = this.grid.fields[ this.pos ],

                step = field[this.dir][ this.counter ];

            ctx.fillRect( step.x - this.size/2, step.y - this.size/2, this.size, this.size);

            this.counter++;

            if ( this.counter === field[this.dir].length ){

                this.pos = this.nextPos;
                this.counter = 0;
            }
        },

        remove: function () {

            delete this.pool[this.id];
        }
    };

})();
