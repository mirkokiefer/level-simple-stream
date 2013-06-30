
var assert = require('assert')
var levelup = require('levelup')
var MemDOWN = require('memdown')
var ReadStream = require('./index')
var stream = require('stream')

var testData = [
  {key: 'a', value: '1'},
  {key: 'b', value: '2'},
  {key: 'c', value: '3'},
  {key: 'd', value: '4'},
  {key: 'e', value: '5'}  
]

var factory = function (location) { return new MemDOWN(location) }

var db = levelup('test', { db: factory })

describe('levelup-readable', function() {
  before(function(done) {
    // write testData to db
    var updates = testData.map(function(each) {
      return {type: 'put', key: each.key, value: each.value}
    })
    db.batch(updates, done)
  })
  it('should check data was written', function(done) {
    db.get('b', function(err, res) {
      assert.equal(res, '2')
      done()
    })
  })
  it('should open a new read stream', function(done) {
    var i = 0
    var stream = new ReadStream(db)
      .on('readable', function() {
        var data = stream.read()
        assert.deepEqual(data, testData[i])
        i++
      })
      .on('end', done)
  })
})