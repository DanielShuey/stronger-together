
vows = require 'vows'
assert = require 'assert'
chai = require 'chai'

require('../lib/stronger-together.js').patch()

chai.should()

suite = vows.describe 'Object'

TraitableTwo = class

suite.addBatch

  '.trait':

    'create same name trait in two different classes':
      topic: ->
        class TraitableTwo
          @trait 'bar', {a_method: -> false}
        class TraitableThree
          @trait 'bar', {a_method: -> true}
        return TraitableThree

      'stores "bar" in traits datastore': (traitable) ->
        ('bar' of traitable.traits()).should.equal true

      'TraitableTwo function should be false': (traitable) ->
        TraitableTwo.traits()['bar'].a_method().should.equal false

      'TraitableThree function should be true': (traitable) ->
        traitable.traits()['bar'].a_method().should.equal true


  '.with':
    'Mix into Traitable Class, a Trait with method "fly" that returns true':
      topic: ->
        class Flyer extends Trait
          fly: -> true
        class Bird
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
          class Bird
            @with false_trait
        ), Error

  '#with':
    'Mix into Traitable instance, a Trait with method "fly" that returns true':
      topic: ->
        class Flyer extends Trait
          fly: -> true
        class Bird
        (new Bird).with(Flyer)

      'Traitable#fly returns true': (topic) ->
        topic.fly().should.equal true


    'Mix into Traitable instance, a Sub-trait with method "fly" that returns true':
      topic: ->
        class Bird
          @trait 'flyer',
            fly: -> true

        return new Bird

      'Traitable#fly returns true': (traitable) ->
        traitable.with('flyer').fly().should.equal true

suite.export module
