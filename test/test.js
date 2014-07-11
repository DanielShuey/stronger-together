(function() {
  var assert, chai, st, suite, vows,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  vows = require('vows');

  assert = require('assert');

  chai = require('chai');

  st = require('../lib/stronger-together.js');

  chai.should();

  st.load();

  suite = vows.describe('Traitable');

  suite.addBatch({
    '.trait': {
      'name is "bar"': {
        topic: function() {
          return Traitable.trait('bar', {
            a_method: function() {
              return false;
            }
          });
        },
        'stores "bar" in traits datastore': function() {
          return ('bar' in Traitable._traits).should.equal(true);
        },
        'contains the function passed in': function() {
          return Traitable._traits['bar'].a_method().should.equal(false);
        }
      },
      'name is not string': {
        'throws an error': function() {
          return assert.throws((function() {
            return Traitable.trait(false, {});
          }), Error);
        }
      },
      'functions passed is wrong type': {
        'throws an error': function() {
          return assert.throws((function() {
            return Traitable.trait('trait', false);
          }), Error);
        }
      }
    },
    '.with': {
      'Mix into Traitable Class, a Trait with method "fly" that returns true': {
        topic: function() {
          var Bird, Flyer;
          Flyer = (function(_super) {
            __extends(Flyer, _super);

            function Flyer() {
              return Flyer.__super__.constructor.apply(this, arguments);
            }

            Flyer.prototype.fly = function() {
              return true;
            };

            return Flyer;

          })(Trait);
          Bird = (function(_super) {
            __extends(Bird, _super);

            function Bird() {
              return Bird.__super__.constructor.apply(this, arguments);
            }

            Bird["with"](Flyer);

            return Bird;

          })(Traitable);
          return new Bird;
        },
        'Traitable#fly returns true': function(traitable) {
          return traitable.fly().should.equal(true);
        }
      },
      'Mixing a non-Trait': {
        topic: function() {
          var Flyer;
          Flyer = (function() {
            function Flyer() {}

            Flyer.prototype.fly = function() {
              return true;
            };

            return Flyer;

          })();
          return Flyer;
        },
        'Throws error': function(false_trait) {
          return assert.throws((function() {
            var Bird;
            return Bird = (function(_super) {
              __extends(Bird, _super);

              function Bird() {
                return Bird.__super__.constructor.apply(this, arguments);
              }

              Bird["with"](false_trait);

              return Bird;

            })(Traitable);
          }), Error);
        }
      }
    },
    '#with': {
      'Mix into Traitable instance, a Trait with method "fly" that returns true': {
        topic: function() {
          var Bird, Flyer;
          Flyer = (function(_super) {
            __extends(Flyer, _super);

            function Flyer() {
              return Flyer.__super__.constructor.apply(this, arguments);
            }

            Flyer.prototype.fly = function() {
              return true;
            };

            return Flyer;

          })(Trait);
          Bird = (function(_super) {
            __extends(Bird, _super);

            function Bird() {
              return Bird.__super__.constructor.apply(this, arguments);
            }

            return Bird;

          })(Traitable);
          return (new Bird)["with"](Flyer);
        },
        'Traitable#fly returns true': function(topic) {
          return topic.fly().should.equal(true);
        }
      },
      'Mix into Traitable instance, a Sub-trait with method "fly" that returns true': {
        topic: function() {
          var Bird;
          Bird = (function(_super) {
            __extends(Bird, _super);

            function Bird() {
              return Bird.__super__.constructor.apply(this, arguments);
            }

            Bird.trait('flyer', {
              fly: function() {
                return true;
              }
            });

            return Bird;

          })(Traitable);
          return new Bird;
        },
        'Traitable#fly returns true': function(traitable) {
          return traitable["with"]('flyer').fly().should.equal(true);
        }
      }
    }
  });

  suite["export"](module);

}).call(this);
