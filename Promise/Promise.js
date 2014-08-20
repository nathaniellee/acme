(function (global) {
	var STATE_PENDING = 0;
	var STATE_FULFILLED = 1;
	var STATE_REJECTED = 2;

	function PromiseAPlus(resolver) {
		var _broadcaster = new Broadcaster();
		var _state = STATE_PENDING;
		var _reason;
		var _value;

		if (typeof resolver !== 'function') {
			throw new Error('A resolver function must be supplied to the promise constructor.');
		} else {
			try {
				resolver(_fulfill, _reject);
			} catch (err) {
				_reject(err);
			}
		}

		function _catch(rejectedHandler) {
			return _then(undefined, rejectedHandler);
		}

		function _fulfill(value) {
			if (_state === STATE_PENDING) {
				_state = STATE_FULFILLED;
				_value = value;
				_broadcaster.broadcast('fulfilled', value);
				_broadcaster.clear('fulfilled');
			}
		}

		function _reject(reason) {
			if (_state === STATE_PENDING) {
				_state = STATE_REJECTED;
				_reason = reason;
				_broadcaster.broadcast('rejected', reason);
				_broadcaster.clear('rejected');
			}
		}

		function _then(fulfillHandler, rejectHandler) {
			var promise = new PromiseAPlus(function (fulfill, reject) {
				function onFulfilled(value) {
					try {
						fulfill(fulfillHandler(value));
					} catch (err) {
						reject(err);
					}
				}

				function onRejected(reason) {
					try {
						fulfill(rejectHandler(reason));
					} catch (err) {
						reject(err);
					}
				}

				/*
				 * The supplied handlers must be called asynchronously after the
				 * event loop turn in which this method was called.
				 */
				if (_state === STATE_FULFILLED) {
					global.setTimeout(function () {
						onFulfilled(_value);
					}, 0);
				} else if (_state === STATE_REJECTED) {
					global.setTimeout(function () {
						onRejected(_reason);
					}, 0);
				} else {
					_broadcaster.listen('fulfilled', function (value) {
						onFulfilled(value);
					});
					_broadcaster.listen('rejected', function (reason) {
						onRejected(reason);
					});
				}
			});

			return promise;
		}

		this.catch = _catch;
		this.then = _then;
	}

	function Broadcaster() {
		var _events = {};

		function _broadcast(eventName, data) {
			if (_events.hasOwnProperty(eventName)) {
				_events[eventName].forEach(function (callback) {
					callback(data);
				});
			}
		}

		function _listen(eventName, callback) {
			if (!_events.hasOwnProperty(eventName)) {
				_events[eventName] = [];
			}

			_events[eventName].push(callback);
		}

		function _clear(eventName) {
			if (_events.hasOwnProperty(eventName)) {
				_events[eventName].length = 0;
			}
		}

		this.broadcast = _broadcast;
		this.clear = _clear;
		this.listen = _listen;
	}

	global.Promise = PromiseAPlus;
})(this);
