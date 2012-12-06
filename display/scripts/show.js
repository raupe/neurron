(function(){

	var containerLeft = document.getElementById('container-left'),
		containerRight = document.getElementById('container-right');

    display.current = null;


	display.show = function ( id ) {

        if ( display.current ) {

            document.getElementById( display.current + '-l' ).className = 'hide';
            document.getElementById( display.current + '-r' ).className = 'hide';
        }

        display.current = id;

        var left = document.getElementById( id + '-l' ),
            right = document.getElementById( id + '-r' ),

            view = display.views[ id ],
            temp;


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

        display.logic[ id ]();
	};

})();
