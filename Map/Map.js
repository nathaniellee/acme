(function (global) {
	function Map(items) {
		var _self = this;
		var _getId = (function () {
			var uid = 0;
			return function () {
				return uid++;
			};
		})();
		var _keys = [];
		var _values = [];
		var _valueForNaNKey = undefined;
		var _hasValueForNaNKey = false;

		function _init(items) {
			var i, l, item;

			if (Array.isArray(items)) {
				for (i = 0, l = items.length; i < l; i++) {
					item = items[i];

					if (Array.isArray(item)) {
						_setValue(item[0], item[1]);
					}
				}
			}

			_setSize();
		}

		/***********************************************************************
		 *  
		 *  _clear :: () -> ()
		 *  
		 *  Clear out all keys and values that have been set on this instance.
		 *  
		 */
		function _clear() {
			_keys = [];
			_values = [];
			_valueForNaNKey = undefined;
			_hasValueForNaNKey = false;
			_setSize();
		}

		/***********************************************************************
		 *  
		 *  _deleteValue :: * -> ()
		 *  
		 *  Remove a specific key/value pair from this instance.
		 *  
		 */
		function _deleteValue(key) {
			if (_isActualNaN(key)) {
				_valueForNaNKey = undefined;
				_hasValueForNaNKey = false;
			} else {
				if (_hasKey(key)) {
					var index = _keys.indexOf(key);
					_keys.splice(index, 1);
					_values.splice(index, 1);
				}
			}

			_setSize();
			return false;
		}

		/***********************************************************************
		 *  
		 *  _getValue :: * -> *
		 *  
		 *  Return the value that was set for this key. If the key is an actual
		 *  NaN value, we look at the special `_valueForNaNKey` variable instead
		 *  of pulling from the `_values` array due to the issues with array
		 *  `indexOf` and NaN.
		 *  
		 */
		function _getValue(key) {
			return _isActualNaN(key) ? _valueForNaNKey : _values[_keys.indexOf(key)];
		}

		/***********************************************************************
		 *  
		 *  _hasKey :: * -> boolean
		 *  
		 *  Determine whether a value has been set for this key. If the key is
		 *  an actual NaN value, we look at the flag for whether a value has
		 *  been set for the NaN key which is a special circumstance. Otherwise,
		 *  we see if the key exists in the `_keys` array.
		 *  
		 */
		function _hasKey(key) {
			return _isActualNaN(key) ? _hasValueForNaNKey : _keys.indexOf(key) !== -1;
		}

		/***********************************************************************
		 *  
		 *  _isActualNaN :: * -> boolean
		 *  
		 *  Determine whether a value is an actual NaN value as opposed to a
		 *  value that just happens to not be a number. We need to test for this
		 *  because the array `indexOf` method always returns -1 for actual NaN
		 *  values (thus we need to store a value for that key separately).
		 *  
		 */
		function _isActualNaN(value) {
			return typeof value === 'number' && value !== value;
		}

		/***********************************************************************
		 *  
		 *  _setSize :: () -> ()
		 *  
		 *  Set the public `size` property of the Map instance. We calculate the
		 *  value by adding 1 to the length of the internal `_keys` array if a
		 *  value has been set for the special NaN key.
		 *  
		 */
		function _setSize() {
			_self.size = _keys.length + (_hasValueForNaNKey ? 1 : 0);
		}

		/***********************************************************************
		 *  
		 *  _setValue :: * -> * -> ()
		 *  
		 *  Set a value for this key. If the key is an actual NaN value, we use
		 *  the special `_valueForNaNKey` variable instead of storing in the
		 *  `_values` array due to the issues with array `indexOf` and NaN.
		 *  
		 */
		function _setValue(key, value) {
			if (_isActualNaN(key)) {
				_hasValueForNaNKey = true;
				_valueForNaNKey = value;
			} else {
				if (_hasKey(key)) {
					_values[_keys.indexOf(key)] = value;
				} else {
					_keys.push(key);
					_values.push(value);
				}
			}

			_setSize();
		}

		this.clear = _clear;
		this.delete = _deleteValue;
		this.get = _getValue;
		this.has = _hasKey;
		this.set = _setValue;

		_init(items);
	}

	global.Map = Map;
})(this);
