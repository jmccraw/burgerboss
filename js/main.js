"use strict";

var game;
var player;
var cursors;
var collectibles;
var dodges;
var bonuses;
var scoreboard;
var gameLauncher;
var settings = {
  "global": {
    "mobile": false,
    "score": 0,
    "getCount": 0
  },
  "player": {
    "killed": false,
    "speed": 400,
    "tutorial": {
      "modified": false,
      "x": 0,
      "y": 0
    }
  },
  "collectible": {
    "speed": 250,
    "offset": 1
  },
  "dodge": {
    "seconded": false,
    "speed": 200,
    "offset": 1
  },
  "bonus": {
    "speed": 400,
    "offset": 1
  }
};

/**
  * Launches the game, if on mobile
  */
var launchTheGame = function() {
  var theGame = document.getElementById("burgerBoss");
  theGame.style.display = "block";
  theGame.scrollIntoView();
};
if (/\/m\//.test(window.location.href) || window.innerWidth < 800) {
  gameLauncher = document.getElementById("burgerBossMobileTap");
  gameLauncher.addEventListener("click", launchTheGame, false);
}

// set up the Phaser game instance
game = new Phaser.Game(417, 600, Phaser.AUTO, "burgerBoss");

game.state.add("boot", _BOOT);
game.state.add("load", _LOAD);
game.state.add("tutorial", _TUTORIAL);
game.state.add("start", _START);
game.state.add("main", _MAIN);
game.state.add("gameover", _GAMEOVER);
game.state.start("boot");