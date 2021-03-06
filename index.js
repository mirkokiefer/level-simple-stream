
var streamUtils = require('simple-stream')

function fromDOWN(db, opts) {
  var iterator = db.iterator(opts)
  return {read: read, abort: iterator.end}

  function read(cb) {
    iterator.next(function(err, key, value) {
      if (err) return cb(err)
      if (key === undefined) return iterator.end(cb)
      cb(null, {key: key, value: value})
    })
  }
}

var fromUP = function(db, opts) {
  var readableStream = db.createReadStream(opts)
  var simpleStream = streamUtils.fromReadableStream(readableStream)
  return {read: simpleStream.read, abort: simpleStream.abort}
}

module.exports = {
  fromDOWN: fromDOWN,
  fromUP: fromUP
}
