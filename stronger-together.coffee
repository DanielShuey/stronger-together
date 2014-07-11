
class Trait
  undefined

root['trait'] = (name, func) ->
  root[name] = class extends Trait
    func()

Object.trait = (name, func) ->
  console.log('asdfasdfas')
  if name.instance_of?(String)
    self._traits ||= {}
    self._traits[name] = func
  else
    #throw error

Object.with = (trait) ->
  if trait.type_of? Trait
    this.extend(trait)
  else
    @_traits[trait]()

class Foo
  trait 'bar', ->
    hello = ->
      console.log 'hello'

#foo = (new Foo).with('bar')
#foo.hello()
