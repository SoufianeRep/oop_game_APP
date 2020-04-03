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
