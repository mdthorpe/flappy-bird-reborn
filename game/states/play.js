'use strict';

var Bird = require('../prefabs/bird');
var Ground = require('../prefabs/ground');

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

    // Create a new bird from the Bird prefab
    //
    this.bird = new Bird(this.game, 100, this.game.height/2);

    // Add the bird to the game
    //
    this.game.add.existing(this.bird);

    // Create a ground from the Ground prefab
    //
    this.ground = new Ground(this.game, 0, 400, 335, 112);
   
    // Add the ground to the game
    //
    this.game.add.existing(this.ground);


  },
  update: function() {
    // Make the Bird and Ground collide
    //
    this.game.physics.arcade.collide(this.bird, this.ground);
  }
};

module.exports = Play;