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
			throw new Error('The `resolver` param must be a function.');
		} else {
			resolver(_fulfill, _reject);
		}

		function _fulfill(value) {
			if (_state === STATE_PENDING) {
				_state = STATE_FULFILLED;
				_value = value;

				// Once the execution stack is empty invoke each of the queued
				// fulfilled handlers in the order in which they were added,
				// passing in the fulfilled value, and then clear the queue.
				global.setTimeout(function () {
					_broadcaster.broadcast('fulfilled', _value);
					_broadcaster.clear('fulfilled');
				}, 0);
			}
		}

		function _reject(reason) {
			if (_state === STATE_PENDING) {
				_state = STATE_REJECTED;
				_reason = reason;

				// Once the execution stack is empty invoke each of the queued
				// rejected handlers in the order in which they were added,
				// passing in the rejection reason, and then clear the queue.
				global.setTimeout(function () {
					_broadcaster.broadcast('rejected', _reason);
					_broadcaster.clear('rejected');
				}, 0);
			}
		}

		function _then(fulfillHandler, rejectHandler) {
			var promise = new PromiseAPlus(function (fulfill, reject) {
				_broadcaster.listen('fulfilled', function (value) {
					// If `fulfillHandler` returns a value, fulfill this new
					// promise with that value. If it throws an error, reject
					// this new promise with that error as the reason.
					try {
						fulfill(fulfillHandler(value));
					} catch(reason) {
						reject(reason);
					}
				});
				_broadcaster.listen('rejected', function (reason) {
					// If `rejectHandler` returns a value, fulfill this new
					// promise with that value. If it throws an error, reject
					// this new promise with that error as the reason.
					try {
						fulfill(rejectHandler(reason));
					} catch(reason) {
						reject(reason);
					}
				});
			});

			return promise;
		}

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
