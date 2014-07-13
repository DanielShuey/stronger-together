
vows = require 'vows'
assert = require 'assert'
chai = require 'chai'
require('../lib/stronger-together.js').load()

chai.should()

suite = vows.describe 'Examples'

suite.addBatch

  'Example 1': ->
    class Shark extends Traitable
      @trait 'tornado',
        suffix: 'nado'

      @trait 'mega',
        prefix: 'mega'

      prefix: ''
      suffix: ''

      constructor: ->
        @title = 'shark'

      name: -> @prefix + @title + @suffix

    (new Shark).with('tornado').name().should.equal 'sharknado'
    (new Shark).with('mega').with('tornado').name().should.equal 'megasharknado'

  'Example 2': ->
    class Flying extends Trait
      fly: -> 'I am flying!'

    class Animal extends Traitable
      @with Flying

    animal = new Animal
    animal.fly().should.equal 'I am flying!'

  'Example 3': ->
    class Animal extends Traitable
      fly: -> 'I flap my arms but I do not get off the ground'

    class Flying extends Trait
      fly: -> 'I am flying!'

    animal = new Animal
    animal.fly().should.equal "I flap my arms but I do not get off the ground"

    animal = (new Animal).with(Flying)
    animal.fly().should.equal "I am flying!"

  'Example 4': ->
    class Animal extends Traitable
      fly: -> 'I flap my arms but I do not get off the ground'

      @trait 'flying',
        fly: -> 'I am flying!'

    animal = new Animal
    animal.fly().should.equal "I flap my arms but I do not get off the ground"

    animal = (new Animal).with('flying')
    animal.fly().should.equal "I am flying!"

  'Example 5': ->
    class Shark extends Traitable
      @trait 'tornado',
        on_include: ->
          @setName('Sharknado')

      constructor: ->
        @name = 'Just a regular shark'

      setName: (name) -> @name = name

    (new Shark).with('tornado').name.should.equal 'Sharknado'

suite.export module
