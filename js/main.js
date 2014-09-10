(function() {
  "use strict";

  require.config({
    "baseUrl": "js/",
    "shim": {
      "phaser": {
        "exports": "Phaser"
      }
    }
  });

  requirejs(["phaser.min", "game"], function(Phaser, Game) {
    var game = new Game();
    game.start();
  });

})();