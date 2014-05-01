Map
===

A Map object is a collection of key-value pairs where both the key and the value can be of any type. This differs from the standard JavaScript object where keys must be string values (values of other types are coerced to strings when used as object keys).

Table of Contents
-----------------

* [Instantiation](#instantiation)
* [Properties](#properties)
* [Methods](#methods)

Instantiation
-------------

The Map constructor accepts an array of key-value pairs, defined in two-item arrays, that will serve as the initial collection of members, but it can also be instantiated without any arguments. The constructor will ignore arguments of other types rather than throwing an error.

```javascript 
var map = new Map([
	['1', 'foo'],
	[1, 'bar']
]);

map.has('1');   // true
map.has(1);     // true
map.size;       // 2

map = new Map();
map.size;       // 0

map = new Map('abc');
map.size;       // 0

map = new Map([
	'foo',
	'bar',
	'baz'
]);
map.size;       // 0
```

Properties
----------

### .size :: number

Represents the number of key-value pairs that have been set on this instance.

```javascript
var map = new Map();

map.set('1', 'foo');
map.size;   // 1

map.set(1, 'bar');
map.size;   // 2

map.set({}, 'baz');
map.size;   // 3

map.delete(1);
map.size;   // 2
```

Methods
-------

* [clear](#clear-----)
* [delete](#delete-----boolean)
* [get](#get-----)
* [has](#has-----boolean)
* [set](#set--------)

### .clear :: () -> ()

Removes all key-value pairs that have been set on this instance.

```javascript
var map = new Map();

map.set('1', 'foo');
map.set(1, 'bar');
map.size;       // 2

map.clear();
map.has('1');   // false
map.has(1);     // false
map.size;       // 0
```

### .delete :: * -> boolean

Deletes a single key-value pair from this instance. Always returns false.

```javascript
var map = new Map();

map.set('1', 'foo');
map.set(1, 'bar');
map.size;          // 2

map.delete('1');   // false
map.has('1');      // false
map.size;          // 1
```

### .get :: * -> *

Retrieves the value of the specified key.

```javascript
var map = new Map();

map.set('1', 'foo');
map.set(1, 'bar');
map.get('1');   // 'foo'
map.get(1);     // 'bar'
```

### .has :: * -> boolean

Indicates whether a value has been set for the specified key.

```javascript
var map = new Map();

map.set('1', 'foo');
map.has('1');   // true
map.has(1);     // false
```

### .set :: * -> * -> ()

Adds the specified key-value pair to this instance if the key doesn't already exist or updates the value of a pre-existing key.

```javascript
var map = new Map();

map.set('1', 'foo');
map.set(1, 'bar');
map.get('1');   // 'foo'
map.get(1);     // 'bar'
map.size;       // 2

map.set('1', 'baz');
map.get('1');   // 'baz'
map.size;       // 2
```
