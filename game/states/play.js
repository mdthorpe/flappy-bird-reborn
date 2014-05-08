'use strict';

var Bird = require('../prefabs/bird');
var Ground = require('../prefabs/ground');
var PipeGroup = require('../prefabs/pipeGroup');

function Play() {}
Play.prototype = {
  create: function() {

    // Basic world setup

    // This game is going to use arcade physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Gravity is down
    this.game.physics.arcade.gravity.y = 1200;


    // Add Game Objects

    // Add the background
    this.background = this.game.add.image(0,0,'background');

    // Create a new bird from the Bird prefab
    // and add it to the game
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);

    // Create a ground from the Ground prefab
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    // Create a group to store the pipeGroup prefabs in
    this.pipes = this.game.add.group();

    // Add a timer for generating pipes
    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();


    // Inputs setup

    // prevent spacebar from propogating to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // Add flap control to SPACEBAR
    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        flapKey.onDown.add(this.bird.flap, this.bird);

    // Add mouse click/tap control
    this.input.onDown.add(this.bird.flap, this.bird);

  },

  update: function() {
    // Make the Bird and Ground collide
    //
    this.game.physics.arcade.collide(this.bird, this.ground);
  },

  generatePipes: function () {
    var pipeY = this.game.rnd.integerInRange(-100,100);
    var pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipe);
    }
    pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
  }

};

module.exports = Play;