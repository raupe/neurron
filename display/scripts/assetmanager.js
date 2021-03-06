(function(){

	display.AssetManager = (function(){

		var supportBlob = detectBlob(),
			supportIDB	= detectIDB(),

			channels = {

				load		: new Array(1),
				error		: new Array(1),
				progress	: new Array(1)
			},

			AssetManager = {

				storage		: false,

				_assets		: {},

				image		: {},
				audio		: {},
				video		: {},
				// text		: {},

				length		: 0,	// amount of files
				total		: 0,	// loaded
				step		: 0,	// average
				finished	: true
			};

		/* ToDo: detect browser feature of XHR.responseType && canvas.toBlob */

		function detectBlob() {

			if ( !window.URL ) {

				window.URL = window.webkitURL || window.msURL || window.oURL;
			}

			if ( !window.BlobBuilder ) {

				window.BlobBuilder =	window.BlobBuilder || window.WebKitBlobBuilder ||
										window.MozBlobBuilder || window.MSBlobBuilder ||
										window.OBlobBuilder;
			}

			return true;
		}


		/* ToDo: extend IDB support */

		function detectIDB() {

			// if ( !window.indexedDB ) {

			//	if ( window.mozIndexedDB ) {

			//		window.indexedDB = window.mozIndexedDB;

			//	} else if ( window.webkitIndexedDB ) {

			//		window.indexedDB =  window.webkitIndexedDB;

			//		IDBCursor = webkitIDBCursor;
			//		IDBDatabaseException = webkitIDBDatabaseException;
			//		IDBRequest = webkitIDBRequest;
			//		IDBKeyRange = webkitIDBKeyRange;
			//		IDBTransaction = webkitIDBTransaction;

			//	} else {

			//		throw Error('IndexedDB is currently not supported by your browser.');
			//	}
			// }

			// if ( !window.indexedDB.deleteDatabase ) {

			//  throw Error('IndexedDB is currently not supported by your browser.');
			// }

			return true;
		}


		function getIDB ( name ) {

			console.log('IDB: ', name);
		}





		function check ( obj ) {

			return Object.prototype.toString.call( obj ).slice( 8, -1 );
		}



		function getType ( url ) {

			url = url.substr( url.lastIndexOf('.') + 1 ).toLowerCase();

			if ( url === 'png' || url === 'jpg' || url === 'jpeg' || url === 'gif' || url === 'webp' ) {

				url = 'image';

			} else if ( url === 'wav' || url === 'mp3' || url === 'ogg' || url === 'opus' ) {

				url = 'audio';

			} else if ( url === 'mp4' || url === 'avi' || url === 'webm' ) {

				url = 'video';

			// } else if ( url === 'txt' || url === 'md' ) {

			//	url = 'text';

			} else {

				throw Error( '[ Undefined Type - ".' + url + '" ]');
			}

			return url;
		}


		var norm = { // obj-del

			Object	:	function ( src ) { // key or path

							var list = [], li = 0,

								types = Object.keys( src ),

								type, entries, info, sel,	// temp

								i, l, j, k;					// iterators


							for ( i = 0, l = types.length; i < l; i++ ){

								type = types[i];

								if ( check( src[ type ] ) === 'Object' ) {

									entries = Object.keys( src[ type ] );

									for ( j = 0, k = entries.length; j < k; j++ ) {

										sel = src[type][entries[j]];

										info = {

											type: type,
											id	: entries[j],
											src	: sel.src || sel
										};

										if ( sel.width )	info.width = sel.width;
										if ( sel.height )	info.height = sel.height;

										if ( check(sel) === 'Object' && sel.length ) { // != String

											info.length = sel.length;
										}

										list[ li++ ] = info;
									}

								} else {

									sel = src[type];

									info = {

										type: getType( src[type] ),
										id	: type,
										src	: sel.src || sel
									};

									if ( sel.width )	info.width = sel.width;
									if ( sel.height )	info.height = sel.height;
									if ( sel.length )	info.length = sel.length;

									list[ li++ ] = info;
								}

							}

							return list;
						},

			Array	:	function ( src ) { // full, id, type || just string

							var list = [], li = 0,

								entry, info,		// temp

								i, l;			// iterators

							for ( i = 0, l = src.length; i < l; i++ ) {

								entry = src[i];

								if (  check( entry ) !== 'String' ) {

									info = {

										type: entry.type || getType( entry.src ),
										id	: entry.id,
										src	: entry.src
									};

									if ( entry.width )	info.width = entry.width;
									if ( entry.height )	info.height = entry.height;
									if ( entry.length )	info.length = entry.length;

									list[ li++ ] = info;

								} else {

									info = {

										type: getType( entry ),
										id	: null,
										src	: entry
									};

									list[ li++ ] = info;
								}
							}

							return list;
						},

			String	:	function ( src ) {

							return [ { id: null, type: getType( src ) , src: src }];
						}
		};


		function emit ( type ) {

			var listener = channels[ type ][0];

				args = Array.prototype.slice.call( arguments, 1 );

			if ( check( listener ) === 'Array' ) {

				listener[0].apply( listener[1], args || [] );

			} else {

				// console.warn( 'There is no listener on - "'+ type +'":( ');
			}
		}



		var on = function ( type, callback, context ) {

				channels[ type ][0] = [ callback, context ];
			},


			set = function ( src, callback, storage ) {

				// not supported
				if ( !window.URL || ( !window.Blob && !window.BlobBuilder ) ) {
					callback();
					return;
				}

				if ( storage ) AssetManager.storage = getIDB( storage );

				if ( callback ) channels.load[0] = [ callback ];


				src = norm[ check(src) ]( src );

				var length = src.length,

					current,	// temp

					i;			// iterator

				AssetManager.length = length;
				AssetManager.finished = false;

				AssetManager.total = 0;
				AssetManager.step = ~~( 0.5 + (100 / length) );


				for ( i = 0; i < length; i++ ) {

					current = src[i];

					AssetManager._assets[ current.src ] = 0; // 0 percent loaded

					request( current );
				}
			},

			get = function ( type, id, frame ) {

				var src = ( !id ) ? AssetManager._assets[ type ] : AssetManager[ type ][ id ];

				if ( !src ) return null;

				if ( frame ) src = src[frame];

				if ( check(src) !== 'String' ) { // discrete signal - image

					return src;

				} else { // blob-url || continuous signal

					if ( !id ) type = getType( type );

					var container = ( type === 'audio' ) ? new Audio() : document.createElement('video');

					container.src = src;

					return container;
				}
			},


			unset = function ( id, persistent ) {

				id = norm[ check(id) ]( id );

				var length = id.length,

					current, src,		// temp
					i;					// iterator

				for ( i = 0; i < length; i++ ) {

					current = id[i];

					src = AssetManager._assets[ current.src ];

					delete AssetManager._assets[ current.src ];

					URL.revokeObjectURL( src.src || src );

					if ( persistent ) {

						// remove form IDB
					}
				}
			};



		function request ( asset ) {

			if ( AssetManager.storage && supportIDB ) {

				// check if its in IDB

				// return  ->

			} else {

				var xhr = new XMLHttpRequest();

				xhr.open( 'GET', asset.src, true );

				xhr.onload = function ( t ) {

					var response = xhr.response;

					if ( supportBlob ) {

						loaded( asset, response );

					} else {

						createBlob( asset, response );
					}
				};

				xhr.onprogress = function ( e ) { handleProgress( asset, e ); };

				xhr.onerror = function ( err ) { handleError( asset, xhr.error.code, err );	};

				xhr.responseType = supportBlob ? 'blob' : 'arraybuffer';

				xhr.send();
			}
		}


		function handleProgress ( asset, e ) {

			var perc = ~~( 0.5 + ( AssetManager.step * (~~(( e.loaded / e.total ) * 100 ) ) ) / 100 );

			AssetManager.total += perc - AssetManager._assets[ asset.src ];

			AssetManager._assets[ asset.src ] = perc;

			if ( !AssetManager.finished ) {

				if ( AssetManager.total >= 100 ) {

					AssetManager.total = 100;

					AssetManager.finished = true;
				}

				emit( 'progress', { src: asset, progress: AssetManager.total });
			}
		}



		function handleError ( asset, code, error ) {

			emit( 'error', { src: asset, code: code, error: error });
		}



		function createBlob ( asset, data ) { // convert array buffer

			var view = new DataView( data ),

				type = asset.type,

				url = asset.src || asset.origin,

				format = url.substr( url.lastIndexOf('.') +1 ).toLowerCase(),

				blob; // binary

			try {

				blob = new Blob([ view ], { type: type + '/' + format });

			} catch ( e ) {

				blob = ( new BlobBuilder() ).append([ view ]).getBlob( type + '/' + format );
			}

			loaded( asset, blob );
		}


		function loaded ( asset, blob ) {

			if ( AssetManager.storage && supportIDB ) {} // saving the blobg -> as defined

			var data = URL.createObjectURL( blob );

			if ( asset.type === 'image' ) { // discrete signal

				declareImage( asset, data );

			} else { // continuous signal

				if ( asset.type === 'audio' && asset.length ) {

					getAudioSprites( asset, data );

				} else {

					result( asset, data );
				}
			}
		}

		function declareImage ( asset, data ) {

			var img = new Image();

			img.onload = function(){

				if ( !asset.width && !asset.height ) {

					result( asset, data, img );

				} else { // sprites

					getImageSprites( asset, img );
				}
			};

			img.src = data;
		}


		function getImageSprites ( asset, img ) {

			AssetManager.length--; // origin

			var width = asset.width || asset.height,
				height = asset.height || asset.width,

				columns = img.width/width,
				rows = img.height/height,

				frame = 0,			// counter

				sprite,	info,		// ref

				src, data, buffer,	// temp

				i, j, k, l;			// iterator

			var cvs = document.createElement('canvas'),
				ctx = cvs.getContext('2d');

			cvs.width = width;
			cvs.height = height;

			for ( i = 0; i < rows; i++ ) {

				for ( j = 0; j < columns; j++ ) {

					AssetManager.length++;

					ctx.clearRect( 0, 0, width, height );

					ctx.drawImage(	img,

									j * width,
									i * height,
									width,
									height,
									0,
									0,
									width,
									height
								);

					// to binary data
					if ( true ) {

						src = cvs.toDataURL('img/png');

						data = atob( src.split(',')[1] );

						buffer = new ArrayBuffer( data.length );

						uint = new Uint8Array( buffer );

						for ( k = 0, l = data.length; k < l; k++ ) {

							uint[ k ] = data.charCodeAt(k);
						}

						info = {

							type	: 'image',
							id		: asset.id,
							origin	: asset.src,
							frame	: frame
						};

						createBlob( info, buffer );

					} else { // !! , else case -> blobUrl

						data = cvs.toBlobURL();

						loaded( asset, data );
					}

					frame++;
				}
			}
		}


		function getAudioSprites ( asset, data ) {


			// result( asset, data, audio );
		}



		function result ( asset, data, container ) {

			if ( !asset.origin ) {

				AssetManager._assets[ asset.src ] = container || data;

			} else { // sprite

				if ( !AssetManager._assets[ asset.origin ][0] ){

					AssetManager._assets[ asset.origin ] = [];
				}

				AssetManager._assets[ asset.origin ][ asset.frame ] = container || data;
			}

			if ( asset.id ) {

				AssetManager[ asset.type ][ asset.id ] = AssetManager._assets[ asset.src || asset.origin ];

			} else {

				if ( !AssetManager[ asset.type ]._ ) AssetManager[ asset.type ]._ = [];

				AssetManager[ asset.type ]._.push( AssetManager._assets[ asset.src || asset.origin ] );
			}

			if ( ! --AssetManager.length ) {

				emit( 'load', AssetManager );
			}
		}


		return {

			on		: on,
			set		: set,
			get		: get,
			unset	: unset
		};

	})();


})();
