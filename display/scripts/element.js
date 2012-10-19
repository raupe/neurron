(function(){

    display.Element = {

        register: function(){

            this.pool[this.id] = this; // add themselve to pool of players

            this.nextPos = this.pos = 10;

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

                this.animate( field );
            }
        },

        move: function ( direction ) {

            this.nextPos += direction;
        },

        animate: function( field ) {

            var ctx = this.ctx,

                step = field.antiRing[this.counter];

            ctx.fillRect( step.x - this.size/2, step.y - this.size/2, this.size, this.size);

            this.counter++;


            if ( this.counter === field.antiRing.length ){

                this.pos = this.nextPos;
                this.counter = 0;
            }
        },

        remove: function () {

            delete this.pool[this.id];
        }
    };

})();
