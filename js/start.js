"use strict";

/**
  * The start screen
  */
var _START = {
  "gamePress": function() {
    console.log("_trackEvent", "Vulture, Video Game", "Game of Thrones", "Start Game");
    // _gaq.push(["_trackEvent", "Vulture, Video Game", "Game of Thrones", "Start Game"]);
    if (!settings.global.mobile) {
      game.state.start("main");
    }
    else {
       game.state.start("tutorial");
    }
  },

  "create": function() {
    game.add.sprite(0, 0, (!settings.global.mobile ? "tutorialDesktop" : "tutorialMobile"));
    var key = game.input.keyboard.createCursorKeys();
    key.up.onUp.add(this.gamePress, this);
    game.input.onUp.add(this.gamePress, this);
  }
};