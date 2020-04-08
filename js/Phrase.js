/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    let split = this.phrase.split("");
    split.forEach(letter => {
      if (letter !== " ") {
        let key = document.createElement("li");
        key.textContent = letter;
        key.setAttribute("class", `hide letter ${key.textContent}`);
        document.getElementById("phrase").firstElementChild.appendChild(key);
      } else {
        let space = document.createElement("li");
        space.textContent = ` `;
        space.setAttribute("class", `space`);
        document.getElementById("phrase").firstElementChild.appendChild(space);
      }
    });
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    if (this.checkLetter(letter)) {
      let chosenLetter = Array.from(
        document.getElementsByClassName(`hide letter ${letter}`)
      );
      //handles the problem if more than one pressed key is included in the active phrase
      chosenLetter.forEach(x => {
        x.setAttribute("class", `show`);
        x.classList.add("animated", "tada");
        //removes the "animated" and "tada" from class name not to messup Game.checkWin() methode
        //go back to checkWin() in Game.js
        x.addEventListener("animationend", e => {
          e.target.classList.remove("animated", "tada");
        });
      });
    }
  }
}
