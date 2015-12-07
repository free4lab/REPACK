/**
	@class about browser
 */

var K = {};
K.Browser = (function() {
	var na = window.navigator,
		ua = na.userAgent.toLowerCase(),
		browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon)[ \/]([\d.]+)/ig,
		Browser = {
			platform: na.platform
		};
	ua.replace(browserTester, function(a, b, c) {
		var bLower = b.toLowerCase();
		Browser[bLower] = c;
	});
	if (Browser.opera) { //Opera9.8后版本号位置变化
		ua.replace(/opera.*version\/([\d.]+)/, function(a, b) {
			Browser.opera = b;
		});
	}
	if (Browser.msie) {
		Browser.ie = Browser.msie;
		var v = parseInt(Browser.msie, 10);
		Browser['ie' + v] = true;
	}
	return Browser;
}());

K.isFunction = function(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};
/**
	@LocalStorage class 
 */
var LocalStorage = (function(){
		var ls = window.localStorage;
		function _onstorage( key, callback ){
			var oldValue = ls[key];

			/*
				IE下即使是当前页面触发的数据变更，当前页面也能收到onstorage事件，其他浏览器则只会在其他页面收到
			 */
			return function( e ){
				//IE下不使用setTimeout尽然获取不到改变后的值?!
				setTimeout( function(){
					e = e || window.storageEvent;

					var tKey = e.key,
						newValue = e.newValue;
					//IE下不支持key属性,因此需要根据storage中的数据判断key中的数据是否变化
					if( !tKey ){
						var nv = ls[key];
						if( nv != oldValue ){
							tKey = key;
							newValue = nv;
						}
						
					}
					
					if( tKey == key ){					
						callback && callback(newValue);

						oldValue = newValue;
					}
				}, 0 );
			}
		}
	return {
		getItem: function( key ){
			return ls.getItem( key );
		},
		setItem: function( key, val ){
			return ls.setItem( key, val );
		},
		removeItem: function( key, val ){
			return ls.removeItem( key );
		},
		clear: function(){
			return ls.clear();
		},
		onstorage: function( key, callback ){
			//IE6/7、Chrome使用interval检查更新，其他使用onchange事件
			/*
			Chrome下(14.0.794.0)重写了document.domain之后会导致onstorage不触发
			鉴于onstorage的兼容性问题暂时不使用onstorage事件，改用传统的轮询方式检查数据变化				
			*/
			var b = K.Browser;

			if( !this.useTimer ){
				//IE注册在document上
				if( document.attachEvent && !K.Browser.opera ) {
					document.attachEvent("onstorage", _onstorage(key,callback));
				}
				//其他注册在window上
				else{
					window.addEventListener("storage", _onstorage(key,callback), false);
				};
			}
			else{
			/*
				新的检查方式
			 */
				var listener = _onstorage( key, callback );
				setInterval(function(){
					listener({});
				}, this.interval);	
			}
		},
		//是否使用timer来check(实际项目中由于设置了Domain故Chrome下也需要使用Timer,简单环境下不需要
		useTimer: ( K.Browser.ie && K.Browser.ie < 8 ),
		//onstorage会响应当前页面对存储数据的修改(IE以及Firefox3.6)
		triggerSelf: K.Browser.ie || ( parseInt( K.Browser.firefox ) < 4 ) ,
		//检查storage是否发生变化的时间间隔
		interval: 500
	};
})();

/**
	@Storage class
 */		
var Storage = {
	_store: null,
	_getStore: function(){
		if( this._store ){
			return this._store;
		}
		/*创建store*/
		//localStorage
		if( !!window.localStorage  ){
			this._store = LocalStorage;
		}
		return this._store;
	},
	isAvailable: function(){
		return !!(this._getStore());
	},
	/**
		写入数据
		@static
		@param {string} key 
		@param {string} val 
	 */
	setItem: function( key, val ){
		var st = this._getStore();
		return st && st.setItem( key, val );
	},
	/**
		读取数据
		@static
		@param {string} key 
	 */
	getItem: function( key ){
		var st = this._getStore();
		return st && st.getItem( key );
	},
	/**
		删除数据
		@static
		@param {string} key 
	 */
	removeItem: function( key ){
		var st = this._getStore();
		return st && st.removeItem( key );
	},
	/**
		清空
		@static
	 */
	clear: function( ){
		var st = this._getStore();
		st && st.clear( );
	},
	/**
		监听某个key的变化
		@param {string} key 需要监听的key
		@param {string} callback 当数据发生变化时的回调（回调中传入的参数为当前key对应的值）
	 */
	onstorage: function( key, callback ){
		var st = this._getStore();
		st && st.onstorage( key, callback );
	},
	isStoreUseTimer: function(){
		return this._getStore().useTimer;
	},
	isStoreTriggerSelf: function(){
		return this._getStore().triggerSelf;
	},
	getStoreInterval: function(){
		return this._getStore().interval;
	}
};
