'use strict';
var Pipe = require('./pipe');

var PipeGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  this.topPipe = new Pipe(this.game, 0, 0, 0);
  this.add(this.topPipe);

  this.bottomePipe = new Pipe(this.game, 0, 440, 1);
  this.add(this.bottomePipe);

  this.hasScored = false;

  this.setAll('body.velocity.x', -200);
  
};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {
    this.checkWorldBounds();
};

PipeGroup.prototype.reset = function (x, y) {
    // Reset sprite positions (withing the group)
    this.topPipe.reset(0,0);
    this.bottomePipe.reset(0,440);

    // Set the group position in the world
    this.x = x;
    this.y = y;

    // set the motion
    this.setAll('body.velocity.x', -200);

    // has scored
    this.hasScored = false;

    // make the object exist
    this.exists = true;
};

PipeGroup.prototype.checkWorldBounds = function() {
    if(!this.topPipe.inWorld) {
        this.exists = false;
    }
};

module.exports = PipeGroup;
