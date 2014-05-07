
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {
  },
  create: function() {  
     // add the background sprite
    this.background = this.game.add.image(0, 0, 'background');

    // add the ground sprite as a tile
    // and start scrolling in the negative x direction
    this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
    this.ground.autoScroll(-100, 0);

    // Create a group to put the title assets in
    //
    this.titleGroup = this.game.add.group();

    // Create title sprite 
    // and add it to the new group
    //
    this.title = this.game.add.sprite(0, 0, 'title');
    this.titleGroup.add(this.title);

    // Create the bird sprite
    //
    this.bird = this.game.add.sprite(200, 5, 'bird');
    this.titleGroup.add(this.bird);

    // Animate the bird
    //
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);

    // Set the location of the group
    //
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    // create an oscillating animation tween for the group
    this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Quadratic.NONE, true, 50, 1000, true);
  
    // Add a start button, with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5)
  },

  startClick: function() {
    // Start button clicked.
    //
    this.game.state.start('play');

  },
  
  update: function() {
  }
};

module.exports = Menu;
