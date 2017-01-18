var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// Global Variabls ------------------------------------
var map, layer, player, diamonds, cursors, scoreText;
var diamondsCollected = 0, speed = 150;
//-----------------------------------------------------

// Main Phaser functions ------------
function preload() {
  game.load.tilemap('basic_map', 'assets/graphics/maps/basic_map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('sprites', 'assets/graphics/maps/tmw_desert_spacing.png');
  game.load.spritesheet('basic_player', 'assets/graphics/characters/basic_player.png', 16, 16);
  game.load.image('diamond', 'assets/graphics/diamond.png');
}

function create() {

  // Setup and display the tilemap
  map = game.add.tilemap('basic_map');
  map.addTilesetImage('tmw_desert_spacing', 'sprites');
  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();

  // Display the diamonds
  diamonds = game.add.group();
  diamonds.enableBody = true;
  for (var i = 0; i < 12; i++) {
    diamonds.create(game.rnd.realInRange(32, 750), game.rnd.realInRange(32, 550), 'diamond');
  }

  // Display the player in the center of the screen
  player = game.add.sprite(game.camera.width/2, game.camera.height/2, 'basic_player');
  player.scale.setTo(1.6);

  // Display the Score text
  scoreText = game.add.text(25, 20, 'Score: 0', {fontSize: '32px', fill: '#000'});

  // Start the physics engine
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Enable physics on the player
  game.physics.arcade.enable(player);

  // Player physics properties
  player.body.bounce.y = 0.2;
  player.body.bounce.z = 0.2;
  player.body.collideWorldBounds = true;

  // Player animations
  player.animations.add('down', [0,1,2,3], 10, true);
  player.animations.add('up', [4,5,6,7], 10, true);
  player.animations.add('right', [8, 9, 10, 11], 10, true);
  player.animations.add('left', [12,13,14,15], 10, true);

  // Set up the player keyboard inputs
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  movePlayer();
  checkCollision();
}
//-----------------------------------

// Helper Functions------------------------------
function movePlayer() {
  // Reset the player's velocity to zero every frame
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  // Handle player input
  if (cursors.left.isDown) {
    player.body.velocity.x = -speed;
    player.animations.play('left');
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = speed;
    player.animations.play('right');
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = speed;
    player.animations.play('down');
  }
  else if (cursors.up.isDown) {
    player.body.velocity.y = -speed;
    player.animations.play('up');
  }
  else {
    player.animations.stop();
  }
}

function checkCollision() {
  //handle what happens when the player collides with a diamond
  game.physics.arcade.overlap(player, diamonds, collectDiamonds, null, this);
}

function collectDiamonds(player, diamond) {
  // Remove the diamond from the scene
  diamond.kill();

  //Increment the score
  diamondsCollected++;

  //Re-draw the score text with the new value
  scoreText.text = 'Diamonds Collected: ' + diamondsCollected;
}
// ----------------------------------------------
