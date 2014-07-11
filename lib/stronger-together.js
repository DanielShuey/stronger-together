(function() {
  var StrongerTogether;

  StrongerTogether = (function() {
    function StrongerTogether() {}

    StrongerTogether.load = function() {
      root.Traitable = (function() {
        function _Class() {}

        return _Class;

      })();
      root.Trait = (function() {
        function _Class() {}

        _Class._trait = true;

        return _Class;

      })();
      root.Traitable.trait = function(name, functions) {
        if (typeof name !== 'string') {
          throw Error("Name must be String");
        }
        if (typeof functions !== 'object') {
          throw Error("Functions must be supplied");
        }
        this._traits || (this._traits = {});
        this._traits[name] = functions;
        return this;
      };
      root.Traitable["with"] = function(trait) {
        var func, name, _ref;
        if (!trait._trait) {
          throw Error('Must be a Trait');
        }
        _ref = new trait;
        for (name in _ref) {
          func = _ref[name];
          this.prototype[name] = func;
        }
        return this;
      };
      return root.Traitable.prototype["with"] = function(key) {
        var func, name, trait, _ref;
        trait = false;
        if (key._trait) {
          trait = key;
          _ref = new trait;
          for (name in _ref) {
            func = _ref[name];
            this[name] = func;
          }
        }
        if (typeof key === 'string') {
          trait = this.constructor._traits[key];
          for (name in trait) {
            func = trait[name];
            this[name] = func;
          }
        }
        if (trait != null) {
          if (typeof on_include !== "undefined" && on_include !== null) {
            this.on_include();
          }
          return this;
        }
        throw Error("Trait " + key + " does not exist");
      };
    };

    return StrongerTogether;

  })();

  module.exports = StrongerTogether;

}).call(this);
