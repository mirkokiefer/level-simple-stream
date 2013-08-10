
var createLevelIterator = function(db, opts) {
  return db.iterator(opts)
}

module.exports = createLevelIterator
