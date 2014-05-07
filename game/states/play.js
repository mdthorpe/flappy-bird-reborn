'use strict';

var Bird = require('../prefabs/bird');

function Play() {}
Play.prototype = {
  create: function() {

    // this game is going to use arcade physics
    //
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Gravity is down
    //
    this.game.physics.arcade.gravity.y = 500;

    // Add the background
    //
    this.background = this.game.add.image(0,0,'background');

    yo
  },
  update: function() {}
};

module.exports = Play;