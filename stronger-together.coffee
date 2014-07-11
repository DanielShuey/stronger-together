__extend = (base, mixin) ->
  base[method_name] = func for method_name, func of mixin
  base

__include = (base, mixin) ->
  __extend base.prototype, mixin

Traitable = class
Trait = class

Traitable.trait = (name, func) ->
  if typeof name is 'string'
    @_traits ||= {}
    @_traits[name] = func
    return this
  else
    throw Error "#{trait_name} is not a string"

Traitable.with = (trait) ->
  __include(this, trait)

Traitable::with = (trait_name) ->
  trait = trait_name if trait_name instanceof Trait
  trait = @constructor._traits[trait_name] if typeof trait_name is 'string'
  if trait?
    __extend(this, trait)
    @on_include()
    return this
  else
    throw Error "#{trait_name} is not a Trait"

class Foo
  @trait 'bar',
    on_include: ->
      console.log 'i am included'
    hello: ->
      console.log 'hello'

foo = (new Foo).with('bar')
foo.hello()
