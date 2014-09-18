"use strict";

/**
  * The main game state
  */
var _MAIN = {
  /**
    * The text that appears over a character's head
    * @param{String} text The text to display above head
    * @param{boolean} bonus Whether this is a bonus catch phrase or hiccup
    * @param{boolean} shift Whether to shift left or up
    */
  "popUpText": function(text, bonus, shift) {
    var tempLabel;
    var tempTween;
    var tempSprite;
    var tempTween2;
    var leftSide = (player.x + (player.width * 2) >= game.world.width ? true : false);

    // if the player text can be on the right
    if (!leftSide) {
      tempLabel = game.add.text(
        (!shift ? player.x + (player.width / 2) : player.x + 10),
        (!shift ? player.y : player.y + 40),
        text, {
          "font": "400 15px/1 Arcade-Normal, sans-serif",
          "fill": "#fff",
          "align": "center"
        });
    }
    // if the player is too far to the right, display the text on the left, instead
    else {
      tempLabel = game.add.text(
        (!shift ? player.x + (player.width / 2) : player.x + player.width + 10),
        (!shift ? player.y : player.y + 40),
        text, {
          "font": "400 15px/1 Arcade-Normal, sans-serif",
          "fill": "#fff",
          "align": "center"
        });
    }
    tempLabel.anchor.setTo(0.5, 0.5);
    // if the player has enough space on the right, display it there
    if (!leftSide) {
      tempTween = game.add.tween(tempLabel).to(
        (!shift ? {"y": tempLabel.y - 20} : {"x": tempLabel.x - 35, "y": tempLabel.y - 58}),
        (!shift ? 300 : 600),
        Phaser.Easing.Linear.None, true, 0, 0, false)
        .to({"alpha": 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    }
    // else, display it on the left
    else {
      tempTween = game.add.tween(tempLabel).to(
        (!shift ? {"y": tempLabel.y - 20} : {"x": tempLabel.x + player.width + 35, "y": tempLabel.y - 58}),
        (!shift ? 300 : 600),
        Phaser.Easing.Linear.None, true, 0, 0, false)
        .to({"alpha": 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    }
    tempTween._lastChild.onComplete.add(function() {
      tempLabel.destroy();
    });
    // increment how many times user caught something
    ++settings.global.getCount;
    // display the hiccup after every fifth drink/bonus caught
    if ((settings.global.getCount === 5) && !bonus) {
      settings.global.getCount = 0;
      var tempSprite;
      var tempTween2;
      // if the player has enough space on the right, display it there
      if (!leftSide) {
        tempSprite = game.add.sprite(player.x + player.width + 25, player.y + 25, "hiccup");
      }
      // else, display it on the left
      else {
        tempSprite = game.add.sprite(player.x - 30, player.y + 25, "hiccupAlt");
      }
      tempSprite.anchor.setTo(0.5, 0.5);
      tempTween2 = game.add.tween(tempSprite).to({"y": tempSprite.y - 15}, 300, Phaser.Easing.Linear.None, true, 0, 0, false)
        .to({"alpha": 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
      tempTween2._lastChild.onComplete.add(function() {
        tempSprite.kill();
      });
    }
  },

  "generateCatchPhrase": function() {
    var phrase;
    var leftSide = (player.x + (player.width * 2) >= game.world.width ? true : false);
    if (!leftSide) {
      phrase = game.add.sprite(player.x + player.width + 23, player.y - 20, "catchPhrase" + (game.time.now % 2 === 0 ? "" : "2"));
    }
    else {
      phrase = game.add.sprite(player.x - 45, player.y - 20, "catchPhrase" + (game.time.now % 2 === 0 ? "Alt" : "2Alt"));
    }
    phrase.anchor.setTo(0.5, 0.5);
    var phraseTween = game.add.tween(phrase).to({"y": phrase.y - 15}, 600, Phaser.Easing.Linear.None, true, 0, 0, false)
      .to({"alpha": 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    phraseTween._lastChild.onComplete.add(function() {
      phrase.kill();
    });
  },

  "addCollectible": function(player, collectible) {
    collectible.kill();
    settings.global.score += 100;
    scoreboard.text = "SCORE: " + settings.global.score;
    this.popUpText("+100", false, false);
  },

  "collectBonus": function(player, chalice) {
    chalice.kill();
    settings.global.score += 1000;
    scoreboard.text = "SCORE: " + settings.global.score;
    this.popUpText("+1000", true, true);
    this.generateCatchPhrase();
  },

  "killPlayer": function(player, dodge) {
    // stop all the timer loops from generating new objects
    game.time.removeAll();
    var blood = game.add.emitter(player.x + (player.width / 2), dodge.y, 200);
    blood.makeParticles("blood");
    blood.start(false, 800, 30);
    player.body.velocity.x = 0;
    player.animations.stop();
    collectibles.setAll("body.velocity.y", 0);
    collectibles.setAll("body.gravity.y", 0);
    dodges.setAll("body.velocity.y", 0);
    dodges.setAll("body.gravity.y", 1);
    bonuses.setAll("body.velocity.y", 0);
    bonuses.setAll("body.gravity.y", 0);
    bonuses.forEach(function(self) {
      self.animations.stop();
    });
    game.tweens.pauseAll();
    settings.player.killed = true;
    setTimeout(function() {
      game.state.start("gameover");
    }, 2500);
  },

  "moveLeft": function() {
    if (!settings.player.killed) {
      player.body.velocity.x = -settings.player.speed;
    }
  },

  "moveRight": function() {
    if (!settings.player.killed) {
      player.body.velocity.x = settings.player.speed;
    }
  },

  "stopMoving": function() {
    player.body.velocity.x = 0;
    player.animations.stop();
    // if the user is using two buttons to move, where both pressed, account for that
    if (cursors.left.isDown) {
      this.moveLeft();
    }
    else if (cursors.right.isDown) {
      this.moveRight();
    }
  },

  "testMovement": function(touch) {
    var playerOffset = player.x + (player.width / 2);
    if (!settings.player.killed) {
      if (touch.position.x < playerOffset) {
        this.moveLeft();
      }
      else if (touch.position.x > playerOffset) {
        this.moveRight();
      }
      else {
        this.stopMoving();
      }
    }
  },

  "createCollectible": function() {
    var collectible = collectibles.create(game.rnd.integerInRange(30, game.world.width - 30), -47, "collect");
    collectible.outOfBoundsKill = true;
    collectible.body.velocity.y = 100;
    collectible.body.gravity.y = settings.collectible.speed + settings.collectible.offset;
  },

  "createDodge": function() {
    var dodge = dodges.create(game.rnd.integerInRange(30, game.world.width - 60), -60, "dodge");
    dodge.outOfBoundsKill = true;
    dodge.body.gravity.y = settings.dodge.speed + settings.dodge.offset;
    dodge.body.setSize(dodge.width, 10, 0, 0);
    dodge.anchor.setTo(0.66, 0.3);
    game.add.tween(dodge).to({"angle": 360}, 2000).loop().start();
  },

  "createBonus": function() {
    var chalice = bonuses.create(game.rnd.integerInRange(30, game.world.width - 30), -75, "bonus");
    chalice.outOfBoundsKill = true;
    chalice.body.gravity.y = settings.bonus.speed + settings.bonus.offset;
    chalice.anchor.setTo(0.5, 0.5);
    chalice.animations.add("bubble");
    chalice.animations.play("bubble", 5, true);
  },

  "preload": function() {
    // reset the game variables
    settings = {
      "global": {
        "mobile": settings.global.mobile,
        "score": 0,
        "getCount": 0
      },
      "player": {
        "killed": false,
        "speed": 400,
        "tutorial": settings.player.tutorial
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
  },

  "create": function() {
    // stop all the timer loops from generating new objects
    game.time.reset();

    // physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // main game background
    game.add.sprite(0, 0, "background");

    // create the player
    player = game.add.sprite(
      (!settings.player.tutorial.modified ? game.world.centerX - 34 : settings.player.tutorial.x),
      (!settings.player.tutorial.modified ? game.world.height - 129 : settings.player.tutorial.y), "character");
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(player.width, player.height / 2, 0, 0);

    // generate collectibles
    collectibles = game.add.group();
    collectibles.enableBody = true;

    // generate things to dodge
    dodges = game.add.group();
    dodges.enableBody = true;

    // generate bonus items to collect
    bonuses = game.add.group();
    bonuses.enableBody = true;

    // create the scoreboard
    scoreboard = game.add.text(205, 30,
      "SCORE: " + settings.global.score, {
        "font": "400 15px/1 Arcade-Normal, sans-serif",
        "fill": "#fff",
        "align": "right"
      });
    scoreboard.anchor.setTo(0, 0.5);

    // increment collectible timer
    game.time.events.loop(300, function() {
      ++settings.collectible.offset;
    }, this);

    // increment bonus timer
    game.time.events.loop(1000, function() {
      ++settings.bonus.offset;
    }, this);

    // increment dodge timer
    game.time.events.loop(500, function() {
      ++settings.dodge.offset;
    }, this);

    // add the first collectible and generate a loop
    this.createCollectible();
    game.time.events.loop(2000 - (settings.collectible.offset / 2), function() {
      this.createCollectible();
    }, this);
    // generate second collectible
    game.time.events.loop(4500 - (settings.collectible.offset / 2), function() {
      this.createCollectible();
    }, this);

    // add first dodge and generate loop
    this.createDodge();
    game.time.events.loop(3500 - (settings.dodge.offset / 2), function() {
      this.createDodge();
    }, this);
    // generate second dodge loop
    game.time.events.loop(3000 - (settings.dodge.offset / 2), function() {
      this.createDodge();
    }, this);

    // generate bonus loop
    game.time.events.loop(15000 - (settings.bonus.offset / 2), function() {
      this.createBonus();
    }, this);

    // target inputs
    cursors = game.input.keyboard.createCursorKeys();
    cursors.left.onDown.add(this.moveLeft, this);
    cursors.left.onUp.add(this.stopMoving, this);
    cursors.right.onDown.add(this.moveRight, this);
    cursors.right.onUp.add(this.stopMoving, this);
    game.input.onDown.add(this.testMovement, this);
    game.input.onUp.add(this.stopMoving, this);
  },

  "update": function() {
    if (!settings.player.killed) {
      if ((game.time.totalElapsedSeconds() > 0.5) && !settings.dodge.seconded) {
        settings.dodge.seconded = true;
        this.createDodge();
      }
      // collision detections
      game.physics.arcade.overlap(player, collectibles, this.addCollectible, null, this);
      game.physics.arcade.overlap(player, dodges, this.killPlayer, null, this);
      game.physics.arcade.overlap(player, bonuses, this.collectBonus, null, this);
    }
  }
};