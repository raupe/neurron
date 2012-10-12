(function(){

	var Action = controller.Action = function ( config ) {

		this.req = new XMLHttpRequest();
		this.url = config.url;
		this.channel = config.channel;

		this.register();
	};


	Action.prototype.register = function(){

		/* serve response  */
		this.req.onload = function ( t ) {

			var res = t.responseText;
			console.log(res);
			// console.log('error', t);
			// this.controllerId = t.id;
			// this.color = 'blue';
		};

		// /* on remove */
		// document.onbeforeunload = function(){

		// };

		this.send( this.channel + 0 );
	};


	//
	Action.prototype.delegate = function( starts, ends ){

        var start = { x: starts[0].clientX, y: starts[0].clientY},
            end = { x: ends[0].clientX, y: ends[0].clientY},
            diffX = Math.abs(end.x - start.x),
            diffY = Math.abs(end.y - start.y),
            direction;

        console.log("ends[0].clientX: "+ends[0].clientX+" starts[0].clientX: "+starts[0].clientX);
        if (diffX > diffY){
            if (start.x > end.x){

                direction = 4;//links

            } else {

                direction = 3;//rechts
            }
        }else{
            if (start.y > end.y){

                direction = 5;//hoch

            } else {

                direction = 6;//unten
            }
        }

        alert(direction);



	};


	Action.prototype.send = function ( data ) {

		this.req.open( 'POST', this.url , true );
		this.req.send( data );
	};


})();
