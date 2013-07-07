
var stream = require('stream')
var levelup = require('levelup')
var createIterator = require('stream-iterator')

var createLevelIterator = function(db, opts) {
  return db.iterator(opts)
}

module.exports = createLevelIterator
