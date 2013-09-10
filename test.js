
var assert = require('assert')
var levelup = require('levelup')
var memdown = require('memdown')
var leveldown = require('leveldown')
var levelStream = require('./index')
var fromDOWN = levelStream.fromDOWN
var fromUP = levelStream.fromUP
var streamUtils = require('simple-stream')

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
      db.open(function() {
        // write testData to db
        var updates = testData.map(function(each) {
          return {type: 'put', key: each.key, value: each.value}
        })
        db.batch(updates, done)
      })
    })
    after(function(done) {
      db.close(done)
    })
    it('should create a stream from the LevelDOWN API', function(done) {
      var stream = fromDOWN(db, {keyAsBuffer: false, valueAsBuffer: false})
      streamUtils.toArray(stream)(function(err, array) {
        assert.deepEqual(array, testData)
        db.close(done)
      })
    })
    it('should create a stream from LevelUP', function(done) {
      var upDB = levelup(dbname, {db: function() { return db }})
      var stream = fromUP(upDB, {keyAsBuffer: false, valueAsBuffer: false})
      streamUtils.toArray(stream)(function(err, array) {
        assert.deepEqual(array, testData)
        done()
      })
    })
  })
}

describe('memdown stream', function() {
  var db = new memdown(dbname)
  testBackend(db)
})

describe('leveldown stream', function() {
  after(function(done) {
    leveldown.destroy(dbname, done)      
  })
  var db = new leveldown(dbname)
  testBackend(db)
})
