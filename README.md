Fun with ECMAScript 6
=====================

As a learning exercise I decided to try to implement some of the new constructs that are planned for ECMAScript 6.

Table of Contents
-----------------

* [Map](#map)
* [Set](#set)

Map
---

A map object is a collection of key-value pairs where both the key and the value can be of any type. This differs from the standard JavaScript object where keys must be string values (values of other types are coerced to strings when used as object keys).

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

[Back to table of contents](#table-of-contents)

Set
---

A set object is a collection of unique values. This differs from the standard JavaScript array which can store the same value at multiple indices.

### .add :: * -> ()

Adds the specified value to this instance if it isn't already a member.

```javascript
var set = new Set();

set.add('1');
set.add(1);
set.has('1');   // true
set.has(1);     // true
set.size;       // 2

set.add('1');
set.size;       // 2
```

### .clear :: () -> ()

Removes all values that have been added to this instance.

```javascript
var set = new Set();

set.add('1');
set.add(1);
set.size;       // 2

set.clear();
set.has('1');   // false
set.has(1);     // false
set.size;       // 0
```

### .delete :: * -> boolean

Deletes a single value from this instance. Always returns false.

```javascript
var set = new Set();

set.add('1');
set.add(1);
set.size;          // 2

set.delete('1');   // false
set.has('1');      // false
set.size;          // 1
```

### .has :: * -> boolean

Indicates whether a value has been added to this instance.

```javascript
var set = new Set();

set.add('1');
set.has('1');   // true
set.has(1);     // false
```

### .size :: number

Represents the number of key-value pairs that have been set on this instance.

```javascript
var set = new Set();

set.add('1');
set.size;   // 1

set.add(1);
set.size;   // 2

set.add({});
set.size;   // 3

set.delete(1);
set.size;   // 2
```

[Back to table of contents](#table-of-contents)
