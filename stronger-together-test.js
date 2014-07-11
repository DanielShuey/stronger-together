
var vows = require('vows'),
    assert = require('assert');

require('./stronger-together');

suite = vows.describe('Stronger Together')

suite.addBatch
  '.trait':
    'name is "foo"':
      topic: Traitable.trait('foo', undefined)
      'Subclass should store "foo" in traits datastore': (topic) -> assert.include(topic.constructor.traits, undefined)

suite.run()
