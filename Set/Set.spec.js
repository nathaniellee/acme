describe('ES6 Set shim', function () {
	var _module;

	function _instantiate(params) {
		_module = new Set(params);
	}

	describe('Instantiation', function () {
		function getInstantiator(params) {
			return function () {
				_instantiate(params);
			};
		}

		it('can be instantiated without any parameters.', function () {
			expect(getInstantiator()).to.not.throw();
		});

		it('can be instantiated with paramters of any type of value.', function () {
			['abc', 123, true, false, function () {}, [], {}, NaN, null, undefined].forEach(function (value) {
				expect(getInstantiator(value)).to.not.throw();
			});
		});

		it('accepts an array of arrays of values.', function () {
			_instantiate([
				123,
				'123',
				NaN
			]);
			expect(_module.has(123)).to.be.true;
			expect(_module.has('123')).to.be.true;
			expect(_module.has(NaN)).to.be.true;
			expect(_module.size).to.equal(3);
		});
	});

	describe('.clear :: () -> ()', function () {
		it('deletes every value from the instance.', function () {
			_instantiate();
			_module.add(123);
			_module.clear();
			expect(_module.size).to.equal(0);
		});
	});

	describe('.delete :: * -> ()', function () {
		it('deletes the specified value, if set.', function () {
			_instantiate();
			_module.add(123);
			_module.delete(123);
			expect(_module.size).to.equal(0);
		});

		it('returns false.', function () {
			_instantiate();
			_module.add(123);
			expect(_module.delete(123)).to.be.false;
		});
	});

	describe('.has :: * -> boolean', function () {
		it('returns true if the value has been added.', function () {
			_instantiate();
			_module.add(123);
			expect(_module.has(123)).to.be.true;
		});

		it('returns false if the value has not been added.', function () {
			_instantiate();
			expect(_module.has(123)).to.be.false;
		});
	});

	describe('.add :: * -> ()', function () {
		it('adds the specified value to the instance if it has not yet been added the instance.', function () {
			_instantiate();
			_module.add(123);
			expect(_module.has(123)).to.be.true;
			expect(_module.size).to.equal(1);
			_module.add(123);
			expect(_module.size).to.equal(1);
		});

		it('differentiates between string and number representations of the same numerical value.', function () {
			_instantiate();
			_module.add(123);
			_module.add('123');
			expect(_module.size).to.equal(2);
		});

		it('treats different NaN values as the same value.', function () {
			var a = NaN;
			var b = NaN;

			_instantiate();
			_module.add(a);
			_module.add(b);
			expect(_module.has(a)).to.be.true;
			expect(_module.has(b)).to.be.true;
			expect(_module.size).to.equal(1);
		});
	});

	describe('.size :: number', function () {
		it('represents the number of values that have been added.', function () {
			_instantiate();
			_module.add(123);
			expect(_module.size).to.equal(1);
			_module.add('123');
			expect(_module.size).to.equal(2);
			_module.add(NaN);
			expect(_module.size).to.equal(3);
		});
	});
});