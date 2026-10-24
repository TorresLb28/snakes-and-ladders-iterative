export class Player {
  constructor(id, name, color, isBot = false) {
    this.id = id;
    this.name = name;
    this.position = 0;
    this.color = color;
    this.isBot = isBot;
  }

  moveTo(position) {
    this.position = position;
  }

  reset() {
    this.position = 0;
  }
}
