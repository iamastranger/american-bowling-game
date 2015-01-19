/**
* @fileOverview File with American Ten-Pin Bowling Game.
* For game rules refer to {@link http://www.topendsports.com/sport/tenpin/scoring.htm}
* @author <a href="mailto:binnykmathew@gmail.com">Binny Mathew</a>
* @version 1.0.0
*/

/**
* Function to represent a class for the Game
* @class
*/
function AmericanBowlingGame() {
  this.rolls = []; //Keeps track of the pins down in each roll
  this.currentRoll = 0;
}

module.exports = AmericanBowlingGame;

/**
* Function to be called to keep track of the pins thrown in a roll.
* Called for each throw of the ball by the player
* @param {number} The number of pins down
*/
AmericanBowlingGame.prototype.roll = function (pins) {
  this.rolls[this.currentRoll++] = pins;
};

/**
* Function to calculate and return score of the game at the end
* @returns {number} The total score of the game
*/
AmericanBowlingGame.prototype.score = function () {

  var score = 0;
  var frameIndex = 0;

  //Loop through all frames, total 10
  for (var frame = 0; frame < 10; frame++) {
    if (this.isStrike(frameIndex)) {
      score += 10 + this.strikeBonus(frameIndex);
      frameIndex += 1;
    } else if (this.isSpare(frameIndex)) {
      score += 10 + this.spareBonus(frameIndex);
      frameIndex += 2;
    } else { //Regular roll
      score += this.calculateRegularRoll(frameIndex);
      frameIndex += 2;
    }
  }

  return score;
};

/**
* Function to check if it was a strike
* @param {number} The index of the frame
* @returns {boolean}
*/
AmericanBowlingGame.prototype.isStrike = function (frameIndex) {
  return this.rolls[frameIndex] === 10;
};


/**
* Function to check if it was a spare
* @param {number} The index of the frame
* @returns {boolean}
*/
AmericanBowlingGame.prototype.isSpare = function (frameIndex) {
  return (this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10);
};


/**
* Function to calcualte the strike bonus
* @param {number} The index of the frame
* @returns {number} The strike bonus
*/
AmericanBowlingGame.prototype.strikeBonus = function (frameIndex) {
  return this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2]
};


/**
* Function to calculate the spare bonus
* @param {number} The index of the frame
* @returns {number} The spare bonus
*/
AmericanBowlingGame.prototype.spareBonus = function (frameIndex) {
  return this.rolls[frameIndex + 2];
};


/**
* Function to calculate a normal roll without spare or strike
* @param {number} The index of the frame
* @returns {number} Total sum in the frame
*/
AmericanBowlingGame.prototype.calculateRegularRoll = function (frameIndex) {
  return this.rolls[frameIndex] + this.rolls[frameIndex + 1];
};
