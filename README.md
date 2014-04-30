Fun with ECMAScript 6
=====================

As a learning exercise I decided to try to implement some of the new constructs that are planned for ECMAScript 6.

Map
---

### .clear :: () -> ()

Remove all key-value pairs that have been set on this instance.

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

Delete a single key-value pair from this instance.

```javascript
var map = new Map();

map.set('1', 'foo');
map.set(1, 'bar');
map.size;       // 2

map.delete('1');
map.has('1');   // false
map.size;       // 1
```
