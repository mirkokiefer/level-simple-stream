
#levelup-iterator
Use the async iterator pattern used in [LevelDown](https://github.com/rvagg/node-leveldown#iterator_next) in [LevelUp](https://github.com/rvagg/node-levelup).

Async iterators can conveniently used with the [async-iterators](https://github.com/mirkokiefer/async-iterators) library.

``` js
var levelup = require('levelup')
var createIterator = require('levelup-iterator')
var iterators = require('async-iterators')

var db = levelup('test')

var iterator = createIterator(db, {start: 'b'})

iterators.forEach(iterator, function(err, entry) {
  console.log(entry)
}, function() {
  console.log('end')
})
```

You can pass in all options to `createIterator(db, [options])` that are used in LevelUp's [`db.createReadStream([options])`](https://github.com/rvagg/node-levelup#createReadStream).