(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // we don't want the bird alive until
  // the game actually starts
  this.alive = false;

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

  // Don't listen to gravity by default;
  this.body.allowGravity = false;
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  
  // if the nose is up (angle < 90)
  // bring it back down.
  if(this.angle < 90 & this.alive){
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

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {  
 	Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

	// start scrolling our ground
	this.autoScroll(-200, 0);
	// enable physics on the ground
	// for collision detection
	//
	this.game.physics.arcade.enableBody(this);

	// Don't be affected by gravity.
	//
	this.body.allowGravity = false;

	// Make immovable
	this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);  
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {  
  // write your prefab's specific update code here  
};

module.exports = Ground;

},{}],4:[function(require,module,exports){
'use strict';

var Pipe = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'pipes', frame);

    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
 
    this.body.allowGravity = false;
    this.body.immovable = true;
};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Pipe;

},{}],5:[function(require,module,exports){
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

},{"./pipe":4}],6:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

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

},{}],9:[function(require,module,exports){
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
},{"../prefabs/bird":2,"../prefabs/ground":3,"../prefabs/pipeGroup":5}],10:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');
    this.load.image('instructions', 'assets/instructions.png');
    this.load.image('getReady', 'assets/get-ready.png');
    
    this.load.spritesheet('bird','assets/bird.png', 34, 24, 3);
    this.load.spritesheet('pipes','assets/pipes.png', 54, 320, 2);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])