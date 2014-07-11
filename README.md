stronger-together
=================

Mixin style Traits

class Foo
  with Bar

Dynamic Traits

(new Foo).with(Bar)

Dynamic Anonymous Trait

(new Foo).with ->
  hello = ->
    console.log 'hello'

Subtraits

class Foo
  trait bar
    hello = ->
      console.log 'hello'

(new Foo).with(-> bar)
