/**
* @fileOverview TDD test file for AmericanBowlingGame.
* @author <a href="mailto:binnykmathew@gmail.com">Binny Mathew</a>
* @version 1.0.0
*/
var assert = require("assert");
var AmericanBowlingGame = require("../app/american-bowling-game");

describe('Tests for the American Ten-Pin Bowling Game', function () {

  var game;

  beforeEach(function () {
    game = new AmericanBowlingGame();
  });

  function rollMany(times, pins) {
    for (var i = 0; i < times; i += 1) {
      game.roll(pins);
    }
  }

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }

  it('Test for a complete game with all strikes', function () {
    rollMany(12, 10);
    assert.equal(game.score(), 300);
  });

  it('Test for a game with 10 pairs of 9 and an equal misses', function () {
    for (var i=0;i<10;i++){
      game.roll(9);
      game.roll(0);
    }
    assert.equal(game.score(), 90);
  });

  it('Test for a game with 10 pairs of 5 and an equal spares', function () {
    for (var i=0;i<10;i++){
      game.roll(5);
      rollSpare();
    }
    assert.equal(game.score(), 150);
  });

  it('Test for a game with all misses', function () {
    rollMany(20, 0);
    assert.equal(game.score(), 0);
  });

  //TO-DO : Add few more boundary test conditions

});
