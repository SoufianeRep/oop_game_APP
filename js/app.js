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

//testing grounds
// game = new Game();
// game.startGame();
// let keyBoard = document.getElementsByClassName("key");
// let activephrase = game.activePhrase.phrase;

// //loops through they keys on the screen then checks if the active phrase includes the pressed key
// for (i = 0; i < keyBoard.length; i++) {
//   keyBoard[i].addEventListener("click", e => {
//     if (activephrase.includes(e.target.textContent) === true) {
//       let chosenLetter = document.getElementsByClassName(
//         `hide letter ${e.target.textContent}`
//       );
//       //handles the problem if more than one pressed key is included in the active phrase
//       Array.from(chosenLetter).forEach(x => {
//         x.className = "show";
//       });
//     }
//   });
// }
