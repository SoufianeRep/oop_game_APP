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
    keyboard[i].addEventListener("click", function keyboardClickCallBack(e) {
      game.handleInteraction(e.target);
    });
  }
  document.addEventListener("keydown", function keyboardKeydownCallBack(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      for (let i = 0; i < keyboard.length; i++) {
        if (
          keyboard[i].textContent ===
          String.fromCharCode(e.keyCode).toLowerCase()
        ) {
          game.handleInteraction(keyboard[i]);
        }
      }
    }
  });
});

// document.addEventListener("keydown", game.keydownCallback());

// if (game.checkForWin() === true || game.checkForWin() === false) {
//   document.removeEventListener("keydown", keydownCallback);
// }
