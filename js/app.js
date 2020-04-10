/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const btn = document.getElementById("btn__reset");
let keyboard = document.getElementsByClassName("key");
let game;

btn.addEventListener("click", () => {
  game = new Game();
  game.startGame();
  console.log(game.activePhrase.phrase);

  for (i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      game.handleInteraction(e.target);
    });
  }

  document.addEventListener("keydown", game.physicalKeyFunction);
});
