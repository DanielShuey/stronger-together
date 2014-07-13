(function() {
  var TraitableTwo, assert, chai, suite, vows,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  vows = require('vows');

  assert = require('assert');

  chai = require('chai');

  require('../lib/stronger-together.js').patch();

  chai.should();

  suite = vows.describe('Object');

  TraitableTwo = (function() {
    function _Class() {}

    return _Class;

  })();

  suite.addBatch({
    '.trait': {
      'create same name trait in two different classes': {
        topic: function() {
          var TraitableThree;
          TraitableTwo = (function() {
            function TraitableTwo() {}

            TraitableTwo.trait('bar', {
              a_method: function() {
                return false;
              }
            });

            return TraitableTwo;

          })();
          TraitableThree = (function() {
            function TraitableThree() {}

            TraitableThree.trait('bar', {
              a_method: function() {
                return true;
              }
            });

            return TraitableThree;

          })();
          return TraitableThree;
        },
        'stores "bar" in traits datastore': function(traitable) {
          return ('bar' in traitable.traits()).should.equal(true);
        },
        'TraitableTwo function should be false': function(traitable) {
          return TraitableTwo.traits()['bar'].a_method().should.equal(false);
        },
        'TraitableThree function should be true': function(traitable) {
          return traitable.traits()['bar'].a_method().should.equal(true);
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
          Bird = (function() {
            function Bird() {}

            Bird["with"](Flyer);

            return Bird;

          })();
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
            return Bird = (function() {
              function Bird() {}

              Bird["with"](false_trait);

              return Bird;

            })();
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
          Bird = (function() {
            function Bird() {}

            return Bird;

          })();
          return (new Bird)["with"](Flyer);
        },
        'Traitable#fly returns true': function(topic) {
          return topic.fly().should.equal(true);
        }
      },
      'Mix into Traitable instance, a Sub-trait with method "fly" that returns true': {
        topic: function() {
          var Bird;
          Bird = (function() {
            function Bird() {}

            Bird.trait('flyer', {
              fly: function() {
                return true;
              }
            });

            return Bird;

          })();
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
