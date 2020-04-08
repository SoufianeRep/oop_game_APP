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
   * also removes all the changes of its not the first session(keyboard, hears and phrase);
   */
  startGame() {
    //resets all the keyboard keys to their original state original color and enabled
    let keys = document.getElementById("qwerty").querySelectorAll("button");
    keys.forEach((x) => {
      x.setAttribute("class", `key`);
      x.disabled = false;
    });
    //removes all the li children of ul child of phrase div (active phrase)
    let phrase = document.getElementById("phrase").firstElementChild.children;
    Array.from(phrase).forEach((x) => x.remove());
    //resets all the hearts to their original state
    let hearts = document.getElementsByClassName("tries");
    Array.from(hearts).forEach(
      (x) => (x.firstElementChild.src = "images/liveHeart.png")
    );
    //initias a new game by removing the overlay from diplay
    //setting a new random phrase and adds it to display
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
      new Phrase("Nice to meet you"),
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
      new Phrase("An Arm and a Leg"),
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
    const activePhraseLetters = Array.from(
      document.getElementById("phrase").firstElementChild.children
    );
    //removes space nodes from the array and check that every element had "show" class
    return activePhraseLetters
      .filter((x) => x.className !== `space`)
      .every((x) => x.className === `show`);
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
   * Displays game over message and removes keydown eventlistener
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    document.getElementById("overlay").style.display = "";
    if (gameWon) {
      document.getElementById("overlay").className = "win";
      document.getElementById(
        "game-over-message"
      ).innerHTML = `<p>"${this.activePhrase.phrase.toUpperCase()}"</p>
      <p>Congratulations you guessed it right</p>`;
      //removes the keydown event listener after the game is won to prevent the key from behind the overlay
      //delete this line to test
      document.removeEventListener("keydown", this.keydownCallback);
    } else {
      document.getElementById("overlay").className = "lose";
      document.getElementById(
        "game-over-message"
      ).innerHTML = `<p>Too bad the correct phrase was :</p>
      <p>"${this.activePhrase.phrase.toUpperCase()}"</p>`;
      //removes the keydown event listener after the game is lost to prevent the key from behind the overlay
      //delete this line to test
      document.removeEventListener("keydown", this.keydownCallback);
    }
  }
  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    let correctButton = this.activePhrase.checkLetter(button.textContent); // boolean
    if (correctButton) {
      this.activePhrase.showMatchedLetter(button.textContent);
      button.classList.add(`chosen`);
      button.disabled = true;
      //else if the button is not correct and the button is not disabled already
      //to handle the issue of the wrong button still clickable and removes lives if clicked
    } else if (!correctButton && button.disabled === false) {
      this.removeLife();
      button.classList.add(`wrong`, `animated`, `bounceOut`);
      button.disabled = true;
    }
    //sets a timer before displaying the win/lose screen to give 2s
    window.setTimeout(() => {
      if (this.checkForWin()) {
        this.gameOver(true);
      }
    }, 1500);
  }
  /**
   * keydown callback funtion for keydown event listener
   * to make it easier to to remove event once the game is over
   * @param (event) - keydown event handler
   */
  keydownCallback(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      for (let i = 0; i < keyboard.length; i++) {
        if (
          keyboard[i].textContent ===
          String.fromCharCode(event.keyCode).toLowerCase()
        ) {
          game.handleInteraction(keyboard[i]);
        }
      }
    }
  }
}
