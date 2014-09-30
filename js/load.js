"use strict";

/**
  * The loading screen
  */
var _LOAD = {
  "loadBar": {},

  "loadText": {},

  "preload": function() {
    this.loadText = game.add.text(game.world.centerX, game.world.centerY - 30, "Loading...", {
      "font": "400 15px/1.5 Arcade-Normal, Arial, sans-serif",
      "fill": "#fff"
    });
    this.loadText.anchor.setTo(0.5, 0.5);
    this.loadBar = game.add.sprite(game.world.centerX - 100, game.world.centerY - 10, "progress");
    game.load.setPreloadSprite(this.loadBar);

    game.load.image("bob", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACqBAMAAADPWMmxAAAAG1BMVEUAAAD9/N7+qWLGxMaGhIaFUhcCAQL/3DDfISJH9WHjAAAAAXRSTlMAQObYZgAAAKlJREFUeAHt18ENwjAMQFFWYIWswAqs0BVYgRUYG/kSq5ZLVQRISO+fnER9Nx96+kzXdfWZSqVSqVQqlUqlUqnndZeo3B0DqVQqlUr9orpEI7pFZVqiYyqVSl1moynVji4glUrtl3XWHYu6vaxUKnVEOb1uZ1mpVGphym9bU30ds9+oVCqVSqVm+d1mqXbA36tUKpVKpVKp1Owxq8c3o1Kp93X9HZVK3e0J2plvgv1vTEQAAAAASUVORK5CYII=");
    game.load.image("ground", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAAoAQMAAAAYFRZ3AAAAA1BMVEVMLE3vph/9AAAAGUlEQVR4Ae3BAQ0AAADCIPuntscHDAAAyDgL4AABxrDMKwAAAABJRU5ErkJggg==");
    game.load.image("ladder", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAADuBAMAAABR4e3cAAAAD1BMVEUAAACenp6enp6fn5+enp5M9I8BAAAABHRSTlMAxAA7lD6xIgAAAG1JREFUeF7t1KENgEAQRUFaWEIDQAUXOoDff00IBPIOSTKrR+7705dbknPr35rktex19K89dvjYJP/8B5a1D/aB1bzmNc+y9sE+sJrXvOZZ1j7YB5bVvOZZ1j7YB5bVvOZZ1j7YB7ZVzQN2r6obAF5dYQcQ9WMAAAAASUVORK5CYII=");
  },

  "create": function() {
    game.state.start("start");
  }
};