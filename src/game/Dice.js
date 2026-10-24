export class Dice {
  constructor(sides = 6) {
    this.sides = sides;
    this.lastRoll = null;
  }

  roll() {
    this.lastRoll = Math.floor(Math.random() * this.sides) + 1;
    return this.lastRoll;
  }
}
