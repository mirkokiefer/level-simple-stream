
var assert = require('assert')
var levelup = require('levelup')
var memdown = require('memdown')
var leveldown = require('leveldown')
var createIterator = require('./index')
var iterators = require('async-iterators')

var testData = [
  {key: 'a', value: '1'},
  {key: 'b', value: '2'},
  {key: 'c', value: '3'},
  {key: 'd', value: '4'},
  {key: 'e', value: '5'}  
]

var dbname = 'testdb'

var testBackend = function(db) {
  describe('levelup-readable', function() {
    before(function(done) {
      // write testData to db
      var updates = testData.map(function(each) {
        return {type: 'put', key: each.key, value: each.value}
      })
      db.batch(updates, done)
    })
    it('should open an iterator', function(done) {
      var iterator = createIterator(db, {keyAsBuffer: false, valueAsBuffer: false})

      var i = 0
      iterators.forEach(iterator, function(err, key, value) {
        assert.deepEqual({key: key, value: value}, testData[i])
        i++
      }, function() {
        assert.equal(i, 5)
        done()
      })
    })
  })
}

describe('memdown iterator', function() {
  var db = new memdown(dbname)
  testBackend(db)
})

describe('leveldown iterator', function() {
  var db = new leveldown(dbname)

  before(function(done) {
    db.open(done)
  })

  testBackend(db)

  after(function(done) {
    db.close(function() {
      leveldown.destroy(dbname, done)      
    })
  })
})
