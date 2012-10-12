(function(){
	
	var Connection = display.Connection = function( config ){
		
		this.action = config.action;
		this.url = "ws://" + config.server + ":" + config.port;
		
		this.initializeSocket();
	};
	
	Connection.prototype.initializeSocket = function(){
		
		// this.socket = new WebSocket( this.url );
		var action = this.action;
		
		// this.socket.onopen = function( message ){
// 			
		// };
// 		
		// this.socket.onclose = function( message ){
// 			
		// };
		
		// this.socket.onmessage = function( message ){
			
			// message need to be shifted before passing to action
			
			var data = [1, 1, 1020]; // command, type, options
			
			action.handle( data );
		// };
		
		// this.socket.onerror = function( message ){
// 			
		// };
	};
	
})();
