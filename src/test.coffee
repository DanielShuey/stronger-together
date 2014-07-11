#### SETUP
vows = require 'vows'
assert = require 'assert'
chai = require 'chai'
st = require '../lib/stronger-together.js'

chai.should()
st.load()

suite = vows.describe 'Traitable'

suite.addBatch

  '.trait':
    'name is "bar"':
      topic: -> Traitable.trait 'bar', {a_method: -> false}

      'stores "bar" in traits datastore': ->
        ('bar' of Traitable._traits).should.equal true

      'contains the function passed in': ->
        Traitable._traits['bar'].a_method().should.equal false

    'name is not string':
      'throws an error': ->
         assert.throws (-> Traitable.trait false, {}), Error

    'functions passed is wrong type':
      'throws an error': ->
         assert.throws (-> Traitable.trait 'trait', false), Error

  '.with':
    'Mix into Traitable Class, a Trait with method "fly" that returns true':
      topic: ->
        class Flyer extends Trait
          fly: -> true
        class Bird extends Traitable
          @with Flyer

        return new Bird

      'Traitable#fly returns true': (traitable) ->
        traitable.fly().should.equal true

    'Mixing a non-Trait':
      topic: ->
        class Flyer
          fly: -> true

        return Flyer

      'Throws error': (false_trait) ->
        assert.throws (->
          class Bird extends Traitable
            @with false_trait
        ), Error

  '#with':
    'Mix into Traitable instance, a Trait with method "fly" that returns true':
      topic: ->
        class Flyer extends Trait
          fly: -> true
        class Bird extends Traitable
        (new Bird).with(Flyer)

      'Traitable#fly returns true': (topic) ->
        topic.fly().should.equal true

    'Mix into Traitable instance, a Sub-trait with method "fly" that returns true':
      topic: ->
        class Bird extends Traitable
          @trait 'flyer',
            fly: -> true

        return new Bird

      'Traitable#fly returns true': (traitable) ->
        traitable.with('flyer').fly().should.equal true

suite.export module
