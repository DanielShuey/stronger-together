#********************************************************************#
#*                                                                  *#
#*                       Stronger Together                          *#
#*                                                                  *#
#********************************************************************#

class StrongerTogether
  @_constructor_of: (obj) ->
    if obj.protoype? then obj else obj.constructor

  @_prototype_of: (obj) ->
    if obj.prototype? then obj.prototype else obj

  @_instance_with: (obj, key) ->
    trait = false

    if key._trait
      trait = key
      obj[name] = func for name, func of (new trait)

    if typeof key is 'string'
      trait = obj.constructor.traits()[key]
      obj[name] = func for name, func of trait

    if trait?
      obj.on_include() if obj.on_include?
      return obj

    throw Error "Trait #{key} does not exist"

  @_with: (obj, trait) ->
    throw Error 'Must be a Trait' unless trait._trait
    obj::[name] = func for name, func of (new trait)
    return obj

  @_trait: (obj, name, functions) ->
    throw Error "Name must be String" unless typeof name is 'string'
    throw Error "Functions must be supplied" unless typeof functions is 'object'
    obj.traits()[name] = functions
    obj

  root.Trait = class
    @_trait: true

  @load: ->
    root.Traitable = class
      @traits: ->
        @_traits ||= {}
        @_traits[@name] ||= {}
        @_traits[@name]

    root.Traitable.trait = (name, functions) ->
      StrongerTogether._trait(this, name, functions)

    root.Traitable.with = (trait) ->
      StrongerTogether._with(this, trait)

    root.Traitable::with = (key) ->
      StrongerTogether._instance_with(this, key)

    return StrongerTogether

  @patch: ->
    Object::traits = ->
      c = StrongerTogether._constructor_of(this)
      c._traits ||= {}
      c._traits[@name] ||= {}
      c._traits[@name]

    Object::trait = (name, functions) ->
      StrongerTogether._trait(this, name, functions)

    Object::with = (trait) ->
      if @prototype?
        StrongerTogether._with(this, trait)
      else
        StrongerTogether._instance_with(this, trait)

    return StrongerTogether

module.exports = StrongerTogether
