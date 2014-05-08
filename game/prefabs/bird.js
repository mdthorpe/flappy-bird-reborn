'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // initialize your prefab here
  this.anchor.setTo(0.5, 0.5);

  // add and play animation
  //
  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  // Add physics
  this.game.physics.arcade.enableBody(this);

  // Collide with world bounds
  this.body.collideWorldBounds=true;
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  
  // if the nose is up (angle < 90)
  // bring it back down.
  if(this.angle < 90){
  	// every frame bring the nose down 2.5 
  	// degrees.
  	this.angle += 2.5;
  }
  
};

Bird.prototype.flap = function() {
	
	// move the bird up
	this.body.velocity.y = -400;

	// tilt the nose up
	this.game.add.tween(this).to({angle: -40}, 100).start();
};

module.exports = Bird;
