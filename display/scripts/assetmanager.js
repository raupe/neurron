(function(){

	var AssetManager = display.AssetManager = (function(){

		function AssetManager ( assets, storage ) {

			this.storage = storage || false;

			this.requests = [];

			this.assets = {};

			this.supportBlob = this.detectBlob();
			this.supportIDB = this.detectIDB();

			if ( !assets ) return this;

			this.init ( assets );
		}


		/* ToDo: detect browser feature of XHR.responseType */

		AssetManager.prototype.detectBlob = function(){

			if ( !window.URL ) {

				window.URL = window.webkitURL || window.msURL || window.oURL;
			}

			if ( !window.BlobBuilder ) {

				window.BlobBuilder =	window.BlobBuilder || window.WebKitBlobBuilder ||
										window.MozBlobBuilder || window.MSBlobBuilder ||
										window.OBlobBuilder;
			}

			return true;
		};


		/* ToDo: extend IDB support */

		AssetManager.prototype.detectIDB = function(){

			if ( !window.indexedDB ) {

				if ( window.mozIndexedDB ) {

					window.indexedDB = window.mozIndexedDB;

				} else if ( window.webkitIndexedDB ) {

					window.indexedDB =  window.webkitIndexedDB;

					IDBCursor = webkitIDBCursor;
					IDBDatabaseException = webkitIDBDatabaseException;
					IDBRequest = webkitIDBRequest;
					IDBKeyRange = webkitIDBKeyRange;
					IDBTransaction = webkitIDBTransaction;

				} else {

					throw Error('IndexedDB is currently not supported by your browser.');
				}
			}

			if ( !window.indexedDB.deleteDatabase ) {

				throw Error('IndexedDB is currently not supported by your browser.');
			}

			return true;
		};


		/* ToDo: connecting via indexedDB */

		AssetManager.prototype.useStorage = function ( url ) {

			var storage = localStorage[url];

			return storage;
		};



		AssetManager.prototype.clear = function() {

			var assets = Object.keys(this.assets);

			for ( var i = 0, l = assets.length; i < l; i++ ) {

				delete localStorage[ assets[i] ];
			}
		};


		AssetManager.prototype.init = function ( assets ) {

			var types = Object.keys( assets ),

				_list = {},

				counter = 0,

				list = [],

				refs = {},

				sources, media, j, k, key, url;

			// supported: image, audio, text, movie
			for ( var i = 0, l = types.length; i < l; i++ ) {

				media = assets[ types[i] ];

				if ( !media.length ) {

					sources = Object.keys( media );

					this[ types[i] ] = {}; // this.image = {}

				} else {

					sources = media;
				}

				for ( j = 0, k = sources.length; j < k; j++ ) {

					_list[ media[ sources[j] ] ] = 0;

					refs[ media[ sources[j] ] ] = { media: types[i], id: sources[j] };

					list[ counter ++] = media[ sources[j] ];
				}
			}

			this.refs = refs;

			this.assets = _list;

			this.length = list.length;

			this.step = 100/this.length;

			this.total = 0;

			for ( i = 0, l = list.length; i<l; i++ ) {

				this.req( list[i] );
			}
		};


		AssetManager.prototype._getPool = function ( type ) {

			var instance;

			if ( type === XMLHttpRequest && this.requests.length ) {

				instance = this.requests.pop();

			} else {

				instance = new type();
			}

			return instance;
		};


		AssetManager.prototype._setPool = function ( obj ) {

			if ( obj instanceof XMLHttpRequest ) {

				this.requests.push( obj );
			}
		};




		AssetManager.prototype.req = function ( url ) {

			if ( this.storage && this.useStorage( url ) ) {

				if ( !this.usedStorage ) this.usedStorage = true;

				var data = this.useStorage( url );

				this._loaded( url, data ) ;

			} else {

				var xhr = this._getPool( XMLHttpRequest );

				xhr.open( 'GET', url, true );


				xhr.onload = function ( t ) {

					this._setPool( xhr );

					var response = t.currentTarget.response;

					if ( this.supportBlob ) {

						this._loaded( url, response );

					} else {

						this.createBlob( url, response );
					}

				}.bind(this);



				xhr.onerror = function ( err ) {

					this._error( url, err.currentTarget.error.code, err );

				}.bind(this);

				xhr.onprogress = function ( e ) {

					this._progress( url, e );

				}.bind(this);


				xhr.responseType = this.supportBlob ? 'blob' : 'arraybuffer';

				xhr.send();
			}
		};



		AssetManager.prototype.createBlob = function ( url, data ) { // convert arraybuffer

			var view = new DataView( data ),

				type = getType( url ),

				format = url.substr( url.lastIndexOf('.') +1 ).toLowerCase(),

				blob; // binary

			try {

				blob = new Blob([ view ], { type: type + '/' + format });

			} catch ( e ) {

				blob = ( new BlobBuilder() ).append([ view ]).getBlob( type + '/' + format );
			}

			this._loaded( url, blob );
		};



		AssetManager.prototype._loaded = function ( url, blob ) {

			var data = URL.createObjectURL( blob );

			refs = this.refs[url];

			this.assets[ url ] = data;

			if ( refs ) this[refs.media][refs.id] = this.assets[ url ];

			if ( this.storage ) localStorage[url] = result;

			if ( ! --this.length ) {

				// if ( ) -> restrict channel -> just as registered
				display.Element.prototype.assetManager = this;
				display.Background.prototype.assetManager = this;

				_emit('load', this );
			}
		};


		AssetManager.prototype._error = function ( src, code, e ) {

			_emit('error', { src: src, code: code, e: e });
		};


		AssetManager.prototype._progress = function ( src, e ) {

			var perc = ~~( 0.5 + ( this.step * (~~(( e.loaded / e.total ) * 100 ) ) ) / 100 );

			this.total += perc - this.assets[ src ];

			this.assets[ src ] = perc;

			if ( !this._finished ) {

				if ( this.total >= 100 ) { // clear

					this.total = 100;

					this._finished = true;

					this.requests.length = 0;
				}

				_emit('progress', { src: src, progress: this.total	});
			}
		};



		AssetManager.prototype.set = function ( options, callback, context ) {

			channels.load.length = 0; // clean

			channels.load.push( [ callback, context ] );


			if ( !options.length ) options = [ options ];

			var asset;

			this.total = 0;

			this._finish = false;

			this.length = options.length;

			this.step = 100/this.length;

			for ( var i = 0, l = options.length; i < l; i++ ) {

				asset = options[i];

				if ( asset.type && asset.id ) {

					this.refs[ asset.src ] = { media: asset.type, id: asset.id };
				}

				this.req( asset.src );
			}
		};


		AssetManager.prototype.unset = function ( type, key ) {

			if ( !key ) {

				URL.revokeObjectURL( type );

				if ( localStorage[type] ) delete localStorage[type];

				delete this.assets[type];
			}

			else {

				URL.revokeObjectURL( this[type][key] );

				if ( localStorage[ this[type][key] ] ) delete localStorage[ this[type][key] ];

				delete this[type][key];
			}
		};




		/* retrieve media , ToDo: callback ? pool ? */
		AssetManager.prototype.get = function ( type, key ) {

			var src = ( !key ) ? this.assets[type] : this[type][key],

				container = {

					image: new Image(),

					audio: new Audio(),

					video: function( src ){

						var vid = document.createElement('video');

						vid.src = src;

						return vid;
					}
				};

			// isn't defined yet
			if ( !src ) return null;

			if ( !key ) type = getType( type );


			container = container[type];

			container.src = src;

			return container;
		};



		var channels = { // length: 1

			load: [],
			error: [],
			progress: []
		};

		function getType ( url ) {

			url = url.substr( url.lastIndexOf('.') +1 ).toLowerCase();

			if ( url === 'png' || url === 'jpg' || url === 'jpeg' ||	url === 'gif' || url === 'webp' ) {

				url = 'image';

			} else if ( url === 'wav' || url === 'mp3' || url === 'ogg' || url === 'opus' ) {

				url = 'audio';

			} else if ( url === 'mp4' || url === 'avi' || url === 'webm' ) {

				url = 'movie';

			} else {

				throw Error( url + ' <- is not supported yet !');
			}

			return url;
		}

		function _emit( type ) {

			var subscriber = channels[ type ],

				args = Array.prototype.slice.call( arguments, 1 );

			subscriber[0][0].apply( subscriber[0][1], args || [] );
		}


		AssetManager.prototype.on = function ( type, callback, context ) {

			if ( this.usedStorage ) {

				callback( this );

			} else {

				channels[ type ][0] = [ callback, context ];
			}

		};

		return AssetManager;

	})();


})();
