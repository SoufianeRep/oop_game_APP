/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    let keys = document.getElementById("qwerty").querySelectorAll("button");
    keys.forEach(x => {
      x.className = "key";
      x.disabled = false;
    });
    let phrase = document.getElementById("phrase").firstElementChild.children;
    Array.from(phrase).forEach(x => x.remove());
    let hearts = document.getElementsByClassName("tries");
    Array.from(hearts).forEach(
      x => (x.firstElementChild.src = "images/liveHeart.png")
    );

    document.getElementById("overlay").style.display = "none";
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    return [
      new Phrase("Thank you so much"),
      new Phrase("I am so sorry"),
      new Phrase("Could you repeat it please"),
      new Phrase("Nice to meet youa"),
      new Phrase("Son of a Gun"),
      new Phrase("A Piece of Cake"),
      new Phrase("Jaws of Death"),
      new Phrase("Down To The Wire"),
      new Phrase("Jumping the Gun"),
      new Phrase("Hands Down"),
      new Phrase("Yada Yada"),
      new Phrase("Wild Goose Chase"),
      new Phrase("Cut To The Chase"),
      new Phrase("Beating Around the Bush"),
      new Phrase("Talk the Talk"),
      new Phrase("Curiosity Killed The Cat"),
      new Phrase("Drawing a Blank"),
      new Phrase("An Arm and a Leg")
    ];
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    //check if all the letter have a className Show...
    const activePhraseLetters = Array.from(
      document.getElementById("phrase").firstElementChild.children
    );
    return activePhraseLetters
      .filter(x => x.className !== "space")
      .every(x => x.className === "show");
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    let hearts = document.getElementsByClassName("tries");
    if (this.missed < 4) {
      hearts[this.missed].firstElementChild.src = "images/lostHeart.png";
      this.missed += 1;
    } else {
      this.gameOver();
    }
  }
  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    document.getElementById("overlay").style.display = "";
    if (gameWon) {
      document.getElementById("overlay").className = "win";
      document.getElementById(
        "game-over-message"
      ).textContent = `"${this.activePhrase.phrase}".
      Congratulations you guessed it right`;
    } else {
      document.getElementById("overlay").className = "lose";
      document.getElementById(
        "game-over-message"
      ).textContent = `Too bad the correct phrase was :
      ${this.activePhrase.phrase}`;
    }
  }
  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    if (this.activePhrase.checkLetter(button.textContent)) {
      this.activePhrase.showMatchedLetter(button.textContent);
      button.className = "chosen";
      button.disabled = true;
    } else {
      this.removeLife();
      button.className = "wrong";
      button.disabled = true;
    }

    if (this.checkForWin()) {
      this.gameOver(true);
    }
  }
}
