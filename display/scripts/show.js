(function(){

	var containerLeft = document.getElementById('container-left'),
		containerRight = document.getElementById('container-right');

    display.current = null;


	display.show = function ( id ) {

        var left, right,
            view = display.views[ id ],
            temp;

        if ( display.current ) {

            left = document.getElementById( display.current + '-l' );
            if ( left ) left.className = 'hide';

            right = document.getElementById( display.current + '-r' );
            if ( right ) right.className = 'hide';
        }

        display.current = id;

        left = document.getElementById( id + '-l' );
        right = document.getElementById( id + '-r' );

        if ( left ) {

            left.className = 'show';

        } else if ( view.left ) {

            temp = document.createElement('div');
            temp.innerHTML = view.left;
            temp.id = id + '-l';
            temp.className = 'wrapper';
            containerLeft.appendChild( temp );
        }


        if ( right ) {

            right.className = 'show';

        } else if ( view.right ) {

            temp = document.createElement('div');
            temp.innerHTML = view.right;
            temp.id = id + '-r';
            temp.className = 'wrapper';
            containerRight.appendChild( temp );
        }

        // setTimeout( function(){

        display.logic[ id ]();

        // }, 16.7); // innerHTML ?
	};

})();
