export class Board {
  constructor() {
    this.size = 100;
    this.snakes = {
      98: 78,
      95: 75,
      92: 72,
      87: 24,
      64: 60
    };
    this.ladders = {
      1: 38,
      4: 14,
      9: 31,
      21: 42,
      28: 84
    };
    this.gridOrder = this.getVisualOrder();
  }

  getVisualOrder() {
    const order = [];
    for (let row = 9; row >= 0; row--) {
      if ((9 - row) % 2 === 0) {
        for (let col = 0; col < 10; col++) {
          order.push(row * 10 + col + 1);
        }
      } else {
        for (let col = 9; col >= 0; col--) {
          order.push(row * 10 + col + 1);
        }
      }
    }
    return order;
  }

  resolveCell(position) {
    if (position > this.size) {
      return position;
    }
    if (this.snakes[position] !== undefined) {
      return this.snakes[position];
    }
    if (this.ladders[position] !== undefined) {
      return this.ladders[position];
    }
    return position;
  }

  isSpecial(position) {
    if (position > this.size) {
      return false;
    }
    return this.snakes[position] !== undefined || this.ladders[position] !== undefined;
  }

  getType(position) {
    if (position > this.size) {
      return 'normal';
    }
    if (this.snakes[position] !== undefined) {
      return 'snake';
    }
    if (this.ladders[position] !== undefined) {
      return 'ladder';
    }
    return 'normal';
  }
}
