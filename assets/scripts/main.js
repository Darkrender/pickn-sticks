
window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

  var map;
  var layer;


  function preload() {
    game.load.tilemap('basic_map', 'assets/maps/basic_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('sprites', 'assets/maps/tmw_desert_spacing.png');
  }

  function create() {
    map = game.add.tilemap('basic_map');
    map.addTilesetImage('tmw_desert_spacing', 'sprites');
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
  }

  function update() {
  }
};
