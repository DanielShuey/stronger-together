class StrongerTogether
  @load: ->
    root.Traitable = class
    root.Trait = class
      @_trait: true

    root.Traitable.trait = (name, functions) ->
      throw Error "Name must be String" unless typeof name is 'string'
      throw Error "Functions must be supplied" unless typeof functions is 'object'
      @_traits ||= {}
      @_traits[name] = functions
      this

    root.Traitable.with = (trait) ->
      throw Error 'Must be a Trait' unless trait._trait
      this::[name] = func for name, func of (new trait)
      return this

    root.Traitable::with = (key) ->
      trait = false

      if key._trait
        trait = key
        this[name] = func for name, func of (new trait)

      if typeof key is 'string'
        trait = @constructor._traits[key]
        this[name] = func for name, func of trait

      if trait?
        @on_include() if on_include?
        return this

      throw Error "Trait #{key} does not exist"

module.exports = StrongerTogether
