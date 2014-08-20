(function (global) {
	function Set(items) {
		var _self = this;
		var _indexForNaNValue = -1;
		var _values = [];

		function _init(items) {
			if (Array.isArray(items)) {
				for (var i = 0, l = items.length; i < l; i++) {
					_addValue(items[i]);
				}
			}
		}

		/*
		 * Determine whether a value is an actual NaN value as opposed to a
		 * value that just happens to not be a number. We need to test for this
		 * because the array `indexOf` method always returns -1 for actual NaN
		 * values (thus we need special accommodations for that value).
		 */
		function _isActualNaN(value) {
			return typeof value === 'number' && value !== value;
		}

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

		function _clear() {
			_indexForNaNValue = -1;
			_values = [];
			_setSize();
		}

		function _deleteValue(value) {
			var index = _isActualNaN(value) ? _indexForNaNValue : _values.indexOf(value);

			if (index !== -1) {
				_values.splice(index, 1);
				_setSize();
			}

			return false;
		}

		function _hasValue(value) {
			return (_isActualNaN(value) ? _indexForNaNValue : _values.indexOf(value)) !== -1;
		}

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
