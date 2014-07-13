(function() {
  var assert, chai, suite, vows,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  vows = require('vows');

  assert = require('assert');

  chai = require('chai');

  require('../lib/stronger-together.js').load();

  chai.should();

  suite = vows.describe('Examples');

  suite.addBatch({
    'Example 1': {
      topic: function() {
        var Shark;
        Shark = (function(_super) {
          var _class;

          __extends(Shark, _super);

          function Shark() {
            return _class.apply(this, arguments);
          }

          Shark.trait('tornado', {
            on_include: function() {
              return this.setName('Sharknado');
            }
          });

          _class = Shark.name = 'Just a regular shark';

          Shark.prototype.setName = function(name) {
            return this.name = name;
          };

          return Shark;

        })(Traitable);
        return (new Shark)["with"]('tornado');
      },
      'Result': function(topic) {
        return topic.name.should === 'Sharknado';
      }
    },
    'Example 2': function() {
      var Animal, Flying, animal;
      Flying = (function(_super) {
        __extends(Flying, _super);

        function Flying() {
          return Flying.__super__.constructor.apply(this, arguments);
        }

        Flying.prototype.fly = function() {
          return 'I am flying!';
        };

        return Flying;

      })(Trait);
      Animal = (function(_super) {
        __extends(Animal, _super);

        function Animal() {
          return Animal.__super__.constructor.apply(this, arguments);
        }

        Animal["with"](Flying);

        return Animal;

      })(Traitable);
      animal = new Animal;
      return animal.fly().should === 'I am flying!';
    },
    'Example 3': function() {
      var Animal, Flying, animal;
      Animal = (function(_super) {
        __extends(Animal, _super);

        function Animal() {
          return Animal.__super__.constructor.apply(this, arguments);
        }

        Animal.prototype.fly = function() {
          return 'I flap my arms but I do not get off the ground';
        };

        return Animal;

      })(Traitable);
      Flying = (function(_super) {
        __extends(Flying, _super);

        function Flying() {
          return Flying.__super__.constructor.apply(this, arguments);
        }

        Flying.prototype.fly = function() {
          return 'I am flying!';
        };

        return Flying;

      })(Trait);
      animal = new Animal;
      animal.fly().should === "I flap my arms but I do not get off the ground";
      animal = (new Animal)["with"](Flying);
      return animal.fly().should === "I am flying!";
    },
    'Example 4': function() {
      var Animal, animal;
      Animal = (function(_super) {
        __extends(Animal, _super);

        function Animal() {
          return Animal.__super__.constructor.apply(this, arguments);
        }

        Animal.prototype.fly = function() {
          return 'I flap my arms but I do not get off the ground';
        };

        Animal.trait('flying', {
          fly: function() {
            return 'I am flying!';
          }
        });

        return Animal;

      })(Traitable);
      animal = new Animal;
      animal.fly().should === "I flap my arms but I do not get off the ground";
      animal = (new Animal)["with"]('flying');
      return animal.fly().should === "I am flying!";
    },
    'Example 5': function() {
      var Shark;
      Shark = (function(_super) {
        __extends(Shark, _super);

        function Shark() {
          return Shark.__super__.constructor.apply(this, arguments);
        }

        Shark.prototype.setName = function(name) {
          return this.name = name;
        };

        Shark.trait('tornado', {
          on_include: function() {
            return this.setName('Sharknado');
          }
        });

        return Shark;

      })(Traitable);
      return (new Shark)["with"]('tornado').name.should === "Sharknado";
    }
  });

  suite["export"](module);

}).call(this);
