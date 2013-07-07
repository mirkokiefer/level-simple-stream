
var stream = require('stream')
var levelup = require('levelup')
var createIterator = require('stream-iterator')

var createLevelIterator = function(db, opts) {
  var levelStream = db.createReadStream(opts)
  var wrappedStream = new stream.Readable({objectMode: true}).wrap(levelStream)
  return createIterator(wrappedStream)
}

module.exports = createLevelIterator
