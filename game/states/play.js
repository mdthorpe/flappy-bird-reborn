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

    // Pipes
     
    // Create a group to store the pipeGroup prefabs in
    this.pipes = this.game.add.group();

    // Instructions 

    this.instructionsGroup = this.game.add.group();
    this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 100, 'getReady'));
    this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 325, 'instructions'));
    this.instructionsGroup.setAll('anchor.x', 0.5);
    this.instructionsGroup.setAll('anchor.y', 0.5);

    // Inputs setup

    // prevent spacebar from propogating to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // Add flap control to SPACEBAR
    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    flapKey.onDown.addOnce(this.startGame, this);
    flapKey.onDown.add(this.bird.flap, this.bird);

    // Add mouse click/tap control
    this.input.onDown.addOnce(this.startGame, this);
    this.input.onDown.add(this.bird.flap, this.bird);

  },

  update: function() {
    // Make the Bird and Ground collide
    //
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
  
    // Handle collision with pipes
    this.pipes.forEach(function (pipeGroup) {
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
    }, this);
  },

  startGame: function() {
    this.bird.body.allowGravity = true;
    this.bird.alive = true;

    // Add a timer for generating pipes
    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();

    // Remove instructions
    this.instructionsGroup.destroy();
  },

  generatePipes: function () {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipes);  
    }
    pipeGroup.reset(this.game.width, pipeY);
    console.log("Generate Pipe");
  },

  deathHandler: function () {
    this.game.state.start('gameover');
  },

  shutdown: function () {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
  }

};

module.exports = Play;