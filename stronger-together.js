// Generated by CoffeeScript 1.7.1
(function() {
  var Foo, Trait,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Trait = (function() {
    function Trait() {}

    void 0;

    return Trait;

  })();

  root['trait'] = function(name, func) {
    return root[name] = (function(_super) {
      __extends(_Class, _super);

      function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
      }

      func();

      return _Class;

    })(Trait);
  };

  Object.trait = function(name, func) {
    console.log('asdfasdfas');
    if (typeof name.instance_of === "function" ? name.instance_of(String) : void 0) {
      self._traits || (self._traits = {});
      return self._traits[name] = func;
    } else {

    }
  };

  Object["with"] = function(trait) {
    if (typeof trait.type_of === "function" ? trait.type_of(Trait) : void 0) {
      return this.extend(trait);
    } else {
      return this._traits[trait]();
    }
  };

  Foo = (function() {
    function Foo() {}

    trait('bar', function() {
      var hello;
      return hello = function() {
        return console.log('hello');
      };
    });

    return Foo;

  })();

}).call(this);