Fun with ECMAScript 6
=====================

As a learning exercise I decided to try to implement some of the new constructs that are planned for ECMAScript 6.

Map
---

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

### .delete :: * -> ()

Deletes a single key-value pair from this instance.

```javascript
var map = new Map();

map.set('1', 'foo');
map.set(1, 'bar');
map.size;       // 2

map.delete('1');
map.has('1');   // false
map.size;       // 1
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

Adds the specified key-value pair to the instance if the key doesn't already exist or updates the value of a pre-existing key.

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
