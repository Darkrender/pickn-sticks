var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var map;
var layer;


var mainState = {
    preload: function() {
        game.load.tilemap('basic_map', 'assets/maps/basic_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('sprites', 'assets/maps/tmw_desert_spacing.png');
    },

    create: function() {
        map = game.add.tilemap('basic_map');
        map.addTilesetImage('tmw_desert_spacing', 'sprites');
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();
    },

    update: function() {
    }
};

game.state.add('mainState', mainState);
game.state.start('mainState');