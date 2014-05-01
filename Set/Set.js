(function (global) {
	function Set(items) {
		var _self = this;
		var _indexForNaNValue = -1;
		var _values = [];

		function _init(items) {}

		/***********************************************************************
		 *  
		 *  _isActualNaN :: * -> boolean
		 *  
		 *  Determine whether a value is an actual NaN value as opposed to a
		 *  value that just happens to not be a number. We need to test for this
		 *  because the array `indexOf` method always returns -1 for actual NaN
		 *  values (thus we need special accommodations for that value).
		 *  
		 */
		function _isActualNaN(value) {
			return typeof value === 'number' && value !== value;
		}

		/***********************************************************************
		 *  
		 *  _addValue :: * -> ()
		 *  
		 *  Add the specified value to the set if it isn't already a member. We
		 *  need to test if it's an actual NaN value since we store the index of
		 *  that type of value separately to get around the issue with array
		 *  `indexOf` and NaN values.
		 *  
		 */
		function _addValue(value) {
			if (_isActualNaN(value)) {
				if (_indexForNaNValue === -1) {
					_indexForNaNValue = _values.length;
					_values.push(value);
				}
			} else if (_values.indexOf(value) === -1) {
				_values.push(value);
			}

			_setSize();
		}

		/***********************************************************************
		 *  
		 *  _clear :: () -> ()
		 *  
		 *  Clear out all values that have been added to this instance.
		 *  
		 */
		function _clear() {
			_indexForNaNValue = -1;
			_values = [];
			_setSize();
		}

		/***********************************************************************
		 *  
		 *  _deleteValue :: * -> boolean
		 *  
		 *  Remove the specified value if it exists in this instance.
		 *  
		 */
		function _deleteValue(value) {
			var index = _isActualNaN(value) ? _indexForNaNValue : _values.indexOf(value);

			if (index !== -1) {
				_values.splice(index, 1);
				_setSize();
			}

			return false;
		}

		/***********************************************************************
		 *  
		 *  _hasValue :: * -> boolean
		 *  
		 *  Determine whether the value has been added to this instance.
		 *  
		 */
		function _hasValue(value) {
			return (_isActualNaN(value) ? _indexForNaNValue : _values.indexOf(value)) !== -1;
		}

		/***********************************************************************
		 *  
		 *  _setSize :: () -> ()
		 *  
		 *  Set the public `size` property of the Set instance to the length of
		 *  the internal `_values` array.
		 *  
		 */
		function _setSize() {
			_self.size = _values.length;
		}

		this.add = _addValue;
		this.clear = _clear;
		this.delete = _deleteValue;
		this.has = _hasValue;

		_init(items);
	}

	global.Set = Set;
})(this);
