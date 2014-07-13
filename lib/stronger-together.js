(function() {
  var StrongerTogether;

  StrongerTogether = (function() {
    function StrongerTogether() {}

    StrongerTogether._constructor_of = function(obj) {
      if (obj.protoype != null) {
        return obj;
      } else {
        return obj.constructor;
      }
    };

    StrongerTogether._prototype_of = function(obj) {
      if (obj.prototype != null) {
        return obj.prototype;
      } else {
        return obj;
      }
    };

    StrongerTogether._instance_with = function(obj, key) {
      var func, name, trait, _ref;
      trait = false;
      if (key._trait) {
        trait = key;
        _ref = new trait;
        for (name in _ref) {
          func = _ref[name];
          obj[name] = func;
        }
      }
      if (typeof key === 'string') {
        trait = obj.constructor.traits()[key];
        for (name in trait) {
          func = trait[name];
          obj[name] = func;
        }
      }
      if (trait != null) {
        if (typeof on_include !== "undefined" && on_include !== null) {
          obj.on_include();
        }
        return obj;
      }
      throw Error("Trait " + key + " does not exist");
    };

    StrongerTogether._with = function(obj, trait) {
      var func, name, _ref;
      if (!trait._trait) {
        throw Error('Must be a Trait');
      }
      _ref = new trait;
      for (name in _ref) {
        func = _ref[name];
        obj.prototype[name] = func;
      }
      return obj;
    };

    StrongerTogether._trait = function(obj, name, functions) {
      if (typeof name !== 'string') {
        throw Error("Name must be String");
      }
      if (typeof functions !== 'object') {
        throw Error("Functions must be supplied");
      }
      obj.traits()[name] = functions;
      return obj;
    };

    root.Trait = (function() {
      function _Class() {}

      _Class._trait = true;

      return _Class;

    })();

    StrongerTogether.load = function() {
      root.Traitable = (function() {
        function _Class() {}

        _Class.traits = function() {
          var _base, _name;
          this._traits || (this._traits = {});
          (_base = this._traits)[_name = this.name] || (_base[_name] = {});
          return this._traits[this.name];
        };

        return _Class;

      })();
      root.Traitable.trait = function(name, functions) {
        return StrongerTogether._trait(this, name, functions);
      };
      root.Traitable["with"] = function(trait) {
        return StrongerTogether._with(this, trait);
      };
      root.Traitable.prototype["with"] = function(key) {
        return StrongerTogether._instance_with(this, key);
      };
      return StrongerTogether;
    };

    StrongerTogether.patch = function() {
      Object.prototype.traits = function() {
        var c, _base, _name;
        c = StrongerTogether._constructor_of(this);
        c._traits || (c._traits = {});
        (_base = c._traits)[_name = this.name] || (_base[_name] = {});
        return c._traits[this.name];
      };
      Object.prototype.trait = function(name, functions) {
        return StrongerTogether._trait(this, name, functions);
      };
      Object.prototype["with"] = function(trait) {
        if (this.prototype != null) {
          return StrongerTogether._with(this, trait);
        } else {
          return StrongerTogether._instance_with(this, trait);
        }
      };
      return StrongerTogether;
    };

    return StrongerTogether;

  })();

  module.exports = StrongerTogether;

}).call(this);
