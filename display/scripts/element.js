(function(){

    display.Element = {

        register: function(){

            this.pool[this.id] = this; // add themselve to pool of players
            // console.log(this.pool);
        },

        move: function(direction){

        },

        remove: function () {

            delete this.pool[this.id];
        }
    };

})();