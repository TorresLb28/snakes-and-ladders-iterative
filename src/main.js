import { Game } from './game/Game.js';
import { Player } from './game/Player.js';
import { UIController } from './ui/UIController.js';

const game = new Game();

const player1 = new Player(1, 'Player 1', '#3b82f6');
const player2 = new Player(2, 'Player 2', '#f59e0b');

game.addPlayer(player1);
game.addPlayer(player2);

const uiController = new UIController(game);
uiController.init();
