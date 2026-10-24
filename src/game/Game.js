import { Board } from './Board.js';
import { Dice } from './Dice.js';

export class Game {
  constructor() {
    this.board = new Board();
    this.dice = new Dice();
    this.players = [];
    this.currentPlayerIndex = 0;
    this.turnCount = 0;
    this.isGameOver = false;
    this.winner = null;
    this.boardSize = this.board.size;
  }

  addPlayer(player) {
    if (this.players.length < 2) {
      this.players.push(player);
    }
  }

  getCurrentPlayer() {
    if (this.players.length === 0) {
      return null;
    }
    return this.players[this.currentPlayerIndex];
  }

  nextTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.turnCount++;
  }

  checkWin(position) {
    return position === this.boardSize;
  }

  playTurn() {
    if (this.isGameOver) {
      return null;
    }

    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer) {
      return null;
    }

    const roll = this.dice.roll();
    let newPosition = currentPlayer.position + roll;

    if (newPosition > this.boardSize) {
      newPosition = currentPlayer.position;
    }

    const cellType = this.board.getType(newPosition);
    const finalPosition = this.board.resolveCell(newPosition);
    const applied = cellType;

    currentPlayer.moveTo(finalPosition);

    const isWin = this.checkWin(finalPosition);

    if (isWin) {
      this.isGameOver = true;
      this.winner = currentPlayer;
      return {
        player: currentPlayer,
        roll,
        from: currentPlayer.position - roll > 0 ? currentPlayer.position - roll : currentPlayer.position,
        to: newPosition,
        finalPosition,
        isWin: true,
        applied: cellType
      };
    }

    this.nextTurn();

    return {
      player: currentPlayer,
      roll,
      from: currentPlayer.position - (finalPosition - currentPlayer.position >= 0 ? finalPosition - currentPlayer.position : 0),
      to: newPosition,
      finalPosition,
      isWin: false,
      applied: cellType
    };
  }

  resetGame() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].reset();
    }
    this.currentPlayerIndex = 0;
    this.turnCount = 0;
    this.isGameOver = false;
    this.winner = null;
  }
}
