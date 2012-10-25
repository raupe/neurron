(function(){

	if ( !Function.prototype.bind ) {

		Function.prototype.bind = function(){

			var args = Array.prototype.slice.call( arguments, 1 ),
				fn = this;

			return function(){

				return fn.apply( args.concat( Array.prototype.slice.call( arguments, 0) ) );
			};
		};
	}

})();
