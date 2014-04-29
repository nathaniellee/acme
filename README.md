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
map.size;   // 2

map.clear();
map.size;   // 0
```
