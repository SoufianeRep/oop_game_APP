/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const btn = document.getElementById("btn__reset");
let keyBoard = document.getElementsByClassName("key");

let game;

btn.addEventListener("click", () => {
  game = new Game();
  game.startGame();
});

for (i = 0; i < keyBoard.length; i++) {
  keyBoard[i].addEventListener("click", e => {
    game.handleInteraction(e.target);
  });
}

document.addEventListener("keydown", e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    for (let i = 0; i < keyBoard.length; i++) {
      if (
        keyBoard[i].textContent === String.fromCharCode(e.keyCode).toLowerCase()
      ) {
        game.handleInteraction(keyBoard[i]);
      }
    }
  }
});
