describe('ES6 Promise/A+ polyfill', function () {
	var _promise;

	function _instantiate(params) {
		_promise = new Promise(params);
	}

	describe('instantiation', function () {
		function getInstantiator(params) {
			return function () {
				_instantiate(params);
			}
		}

		it('throws if instantiated with something other than a function.', function () {
			['abc', 123, true, false, [], {}, null, undefined].forEach(function (value) {
				expect(getInstantiator(value)).to.throw('The `resolver` param must be a function.');
			});
			expect(getInstantiator(function () {})).to.not.throw();
		});
	});

	describe('.then(fulfilledHandler, rejectedHandler)', function () {
		var value1 = 'abc';
		var value2 = 123;
		var reason = 'This is some type of error.';
		var thenPromise;

		function fulfiller(fulfill, reject) {
			fulfill(value1);
		}

		function rejecter(fulfill, reject) {
			reject(reason);
		}

		it('returns a new promise.', function () {
			_instantiate(fulfiller);
			thenPromise = _promise.then();
			expect(thenPromise).to.be.an.instanceof(Promise);
			expect(thenPromise).to.not.equal(_promise);
		});

		describe('when fulfilledHandler is a function', function () {
			it('calls fulfilledHandler when the promise is fulfilled.', function (done) {
				_instantiate(fulfiller);
				_promise.then(function (fulfilledValue) {
					expect(fulfilledValue).to.equal(value1);
					done();
				});
			});
		});

		describe('when rejectedHandler is a function', function () {
			it('calls rejectedHandler when the promise is rejected.', function (done) {
				_instantiate(rejecter);
				_promise.then(undefined, function (rejectedReason) {
					expect(rejectedReason).to.equal(reason);
					done();
				});
			});
		});

		describe('returned promise', function () {
			describe('when original promise\'s fulfilledHandler returns a value', function () {
				it('is resolved with the returned value.', function (done) {
					_instantiate(fulfiller);
					_promise.then(function () {
						return value2;
					}).then(function (fulfilledValue) {
						expect(fulfilledValue).to.equal(value2);
						done();
					});
				});
			});

			describe('when original promise\'s fulfilledHandler throws', function () {
				it('is rejected with the thrown error.', function (done) {
					var error = new Error(reason);

					_instantiate(fulfiller);
					_promise.then(function () {
						throw error;
					}).then(undefined, function (rejectedReason) {
						expect(rejectedReason).to.equal(error);
						done();
					});
				});
			});
		});
	});
});
