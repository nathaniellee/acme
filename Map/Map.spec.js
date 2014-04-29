describe('ES6 Map shim', function () {
	var _module;

	describe('Instantiation', function () {
		it('works.', function () {
			expect(true).to.be.true;
		});
	});

	describe('.clear :: () -> ()', function () {
		it('deletes every key-value pair from the instance.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			_module.clear();
			expect(_module.size).to.equal(0);
		});
	});

	describe('.delete :: * -> ()', function () {
		it('deletes the specified key, if set, and its value.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			_module.delete(123);
			expect(_module.size).to.equal(0);
		});
	});

	describe('.get :: * -> *', function () {
		it('returns the value of the specified key.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			expect(_module.get(123)).to.equal('foo');
		});

		it('returns `undefined` if a value has not been set for the specified key.', function () {
			_module = new Map();
			expect(_module.get(123)).to.be.undefined;
		});
	});

	describe('.has :: * -> boolean', function () {
		it('returns true if a value has been set for the specified key.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			expect(_module.has(123)).to.be.true;
		});

		it('returns false if a value has been set for the specified key.', function () {
			_module = new Map();
			expect(_module.has(123)).to.be.false;
		});
	});

	describe('.set :: * -> * -> ()', function () {
		it('adds the specified key-value pair to the instance if the key has not yet been set on the instance.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			expect(_module.get(123)).to.equal('foo');
		});

		it('updates the value of a specified key if that key has already been set on the instance.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			_module.set(123, 'bar');
			expect(_module.get(123)).to.equal('bar');
		});

		it('differentiates between string and number representations of the same numerical value specified as keys.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			_module.set('123', 'bar');
			expect(_module.get(123)).to.equal('foo');
			expect(_module.get('123')).to.equal('bar');
		});

		it('treats different NaN values specified as keys as the same key.', function () {
			var a = NaN;
			var b = NaN;

			_module = new Map();
			_module.set(a, 'foo');
			_module.set(b, 'bar');
			expect(_module.get(a)).to.equal('bar');
			expect(_module.get(b)).to.equal('bar');
		});
	});

	describe('.size :: number', function () {
		it('represents the number of key-value pairs that have been set.', function () {
			_module = new Map();
			_module.set(123, 'foo');
			expect(_module.size).to.equal(1);
			_module.set('123', 'bar');
			expect(_module.size).to.equal(2);
			_module.set(NaN, 'baz');
			expect(_module.size).to.equal(3);
		});
	});
});