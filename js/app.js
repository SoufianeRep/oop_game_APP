/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const btn = document.getElementById("btn__reset");
let keyboard = document.getElementsByClassName("key");
let game;

btn.addEventListener("click", () => {
  game = new Game();
  game.startGame();

  for (i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      game.handleInteraction(e.target);
    });
  }

  document.addEventListener("keydown", game.keydownCallback);
});

// const keydownCallback = event => {
//   if (event.keyCode >= 65 && event.keyCode <= 90) {
//     for (let i = 0; i < keyBoard.length; i++) {
//       if (
//         keyBoard[i].textContent ===
//         String.fromCharCode(event.keyCode).toLowerCase()
//       ) {
//         game.handleInteraction(keyBoard[i]);
//       }
//     }
//   }
// };

// document.addEventListener("keydown", game.keydownCallback());

// if (game.checkForWin() === true || game.checkForWin() === false) {
//   document.removeEventListener("keydown", keydownCallback);
// }
