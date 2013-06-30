
var stream = require('stream')
var levelup = require('levelup')
var inherits = require('util').inherits

var ReadStream = function(db, opts) {
  var that = this
  stream.Readable.call(this, {objectMode: true, highWaterMark: 1})
  this.oldStream = db.createReadStream(opts)
    .on('data', function(data) {
      if (!that.push(data)) that.oldStream.pause();
    })
    .on('error', function(err) {
      that.emit('error', err)
    })
    .on('end', function() {
      that.push(null)
    })
}
inherits(ReadStream, stream.Readable)

ReadStream.prototype._read = function(n) {
  this.oldStream.resume()
}

module.exports = ReadStream
