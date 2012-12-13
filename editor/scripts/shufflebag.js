window.ShuffleBag = (function(){

	function ShuffleBag(){

		this.list = [];

		this.currentItem = 0;

		this.currentPosition = 0;
	}


	ShuffleBag.prototype.add = function ( item, frequency ) {

		var list = this.list;

		do {

			list.push( item );

		} while ( --frequency );

		this.currentPos = list.length - 1;
	};


	ShuffleBag.prototype.remove = function ( item, frequency ) {

		var list = this.list,
			temp = [];

		do {

			if ( list[list.length-1] !== item || frequency-- < 1 ) {

				temp.push( list[list.length-1] );
			}

		} while ( --list.length );

		this.list = temp;
		this.currentPos = temp.length - 1;
	};


	ShuffleBag.prototype.next = function(){

		if ( this.currentPos ) {

			var pos = ~~( Math.random() * this.currentPos );

			this.currentItem = this.list[pos];
			this.list[pos] = this.list[ this.currentPos ];
			this.list[this.currentPos] = this.currentItem;

			this.currentPos--;

			return this.currentItem;

		} else {

			this.currentItem = this.list[0];

			this.currentPos = this.list.length - 1;

			return this.currentItem;
		}
	};

	return ShuffleBag;

})();
