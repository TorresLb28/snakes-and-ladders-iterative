export class UIController {
  constructor(game) {
    this.game = game;
    this.boardElement = document.getElementById('game-board');
    this.rollButton = document.getElementById('roll-button');
    this.diceFace = this.rollButton.querySelector('.dice-button__face');
    this.diceResult = document.querySelector('.dice-result');
    this.turnIndicator = document.getElementById('turn-indicator');
    this.playersList = document.getElementById('players-list');
    this.gameLog = document.getElementById('game-log');
    this.ariaLiveRegion = document.getElementById('aria-live-region');
    this.themeSelect = document.getElementById('theme-select');
    this.ladderLabel = document.getElementById('ladder-label');
    this.snakeLabel = document.getElementById('snake-label');
    this.tokenElements = new Map();
  }

  init() {
    this.renderBoard();
    this.renderPlayersList();
    this.renderTokens();
    this.bindEvents();
    this.updateTurnIndicator();
  }

  bindEvents() {
    this.rollButton.addEventListener('click', () => {
      this.handleRollClick();
    });

    if (this.themeSelect) {
      this.themeSelect.addEventListener('change', (event) => {
        this.handleThemeChange(event.target.value);
      });
    }
  }

  handleThemeChange(theme) {
    document.body.setAttribute('data-theme', theme);
    this.updateThemeLabels(theme);
    this.logEvent(`Theme changed to ${theme === 'jungle' ? 'Jungle/Selva' : theme === 'cyberpunk' ? 'Space Cyberpunk' : 'Classic'}`);
    this.announce(`Theme changed to ${theme === 'jungle' ? 'Jungle or Selva' : theme === 'cyberpunk' ? 'Space Cyberpunk' : 'Classic'}`);
  }

  updateThemeLabels(theme) {
    if (theme === 'jungle') {
      if (this.ladderLabel) {
        this.ladderLabel.textContent = 'Vine';
      }
      if (this.snakeLabel) {
        this.snakeLabel.textContent = 'Snake';
      }
    } else if (theme === 'cyberpunk') {
      if (this.ladderLabel) {
        this.ladderLabel.textContent = 'Portal';
      }
      if (this.snakeLabel) {
        this.snakeLabel.textContent = 'Black Hole';
      }
    } else {
      if (this.ladderLabel) {
        this.ladderLabel.textContent = 'Ladder';
      }
      if (this.snakeLabel) {
        this.snakeLabel.textContent = 'Snake';
      }
    }
  }

  renderBoard() {
    this.boardElement.innerHTML = '';
    const gridOrder = this.game.board.gridOrder;
    
    for (let i = 0; i < gridOrder.length; i++) {
      const cellNumber = gridOrder[i];
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', `Cell ${cellNumber}`);
      
      const cellType = this.game.board.getType(cellNumber);
      if (cellType === 'ladder') {
        cell.classList.add('board-cell--ladder');
      } else if (cellType === 'snake') {
        cell.classList.add('board-cell--snake');
      }
      
      const numberSpan = document.createElement('span');
      numberSpan.className = 'board-cell__number';
      numberSpan.textContent = cellNumber;
      
      const labelSpan = document.createElement('span');
      labelSpan.className = 'board-cell__label';
      if (cellType === 'ladder') {
        const currentTheme = document.body.getAttribute('data-theme') || 'classic';
        if (currentTheme === 'jungle') {
          labelSpan.textContent = '🌿';
        } else if (currentTheme === 'cyberpunk') {
          labelSpan.textContent = '⚡';
        } else {
          labelSpan.textContent = '🪜';
        }
      } else if (cellType === 'snake') {
        const currentTheme = document.body.getAttribute('data-theme') || 'classic';
        if (currentTheme === 'jungle') {
          labelSpan.textContent = '🐍';
        } else if (currentTheme === 'cyberpunk') {
          labelSpan.textContent = '🕳️';
        } else {
          labelSpan.textContent = '🐍';
        }
      }
      
      const tokensDiv = document.createElement('div');
      tokensDiv.className = 'board-tokens';
      tokensDiv.setAttribute('data-cell', cellNumber);
      
      cell.appendChild(numberSpan);
      cell.appendChild(labelSpan);
      cell.appendChild(tokensDiv);
      this.boardElement.appendChild(cell);
    }
  }

  renderPlayersList() {
    this.playersList.innerHTML = '';
    for (let i = 0; i < this.game.players.length; i++) {
      const player = this.game.players[i];
      const li = document.createElement('li');
      li.className = 'players-list__item';
      if (i === this.game.currentPlayerIndex && !this.game.isGameOver) {
        li.classList.add('players-list__item--active');
      }
      
      const tokenSpan = document.createElement('span');
      tokenSpan.className = `players-list__token players-list__token--player-${i + 1}`;
      
      const nameSpan = document.createElement('span');
      nameSpan.className = 'players-list__name';
      nameSpan.textContent = player.name;
      
      const positionSpan = document.createElement('span');
      positionSpan.className = 'players-list__position';
      positionSpan.textContent = player.position === 0 ? 'Start' : player.position;
      
      li.appendChild(tokenSpan);
      li.appendChild(nameSpan);
      li.appendChild(positionSpan);
      this.playersList.appendChild(li);
    }
  }

  renderTokens() {
    const allTokensDivs = this.boardElement.querySelectorAll('.board-tokens');
    for (let i = 0; i < allTokensDivs.length; i++) {
      allTokensDivs[i].innerHTML = '';
    }
    this.tokenElements.clear();
    
    for (let i = 0; i < this.game.players.length; i++) {
      const player = this.game.players[i];
      const token = document.createElement('div');
      token.className = `player-token player-token--player-${i + 1}`;
      token.setAttribute('aria-label', `${player.name} token`);
      
      const cellNumber = player.position === 0 ? 1 : player.position;
      const tokensDiv = this.boardElement.querySelector(`.board-tokens[data-cell="${cellNumber}"]`);
      if (tokensDiv) {
        tokensDiv.appendChild(token);
      }
      
      this.tokenElements.set(player, token);
    }
  }

  updateTokens() {
    for (let i = 0; i < this.game.players.length; i++) {
      const player = this.game.players[i];
      const token = this.tokenElements.get(player);
      if (token) {
        const cellNumber = player.position === 0 ? 1 : player.position;
        const tokensDiv = this.boardElement.querySelector(`.board-tokens[data-cell="${cellNumber}"]`);
        if (tokensDiv) {
          if (tokensDiv.contains(token)) {
            tokensDiv.removeChild(token);
          }
          tokensDiv.appendChild(token);
        }
      }
    }
    this.renderPlayersList();
  }

  handleRollClick() {
    if (this.game.isGameOver) {
      this.logEvent('Game is already over!');
      return;
    }

    this.rollButton.disabled = true;
    this.diceFace.textContent = '?';
    this.diceResult.textContent = 'Rolling...';
    this.setDiceRolling(true);

    setTimeout(() => {
      const result = this.game.playTurn();
      this.setDiceRolling(false);
      
      if (result) {
        this.diceFace.textContent = result.roll;
        this.diceResult.textContent = `Rolled ${result.roll}`;
        
        const currentTheme = document.body.getAttribute('data-theme') || 'classic';
        let message = `${result.player.name} rolled ${result.roll}`;
        if (result.applied === 'ladder') {
          if (currentTheme === 'jungle') {
            message += ` and climbed a vine to ${result.finalPosition}!`;
          } else if (currentTheme === 'cyberpunk') {
            message += ` and used a portal to ${result.finalPosition}!`;
          } else {
            message += ` and climbed a ladder to ${result.finalPosition}!`;
          }
        } else if (result.applied === 'snake') {
          if (currentTheme === 'jungle') {
            message += ` and slid down a snake to ${result.finalPosition}!`;
          } else if (currentTheme === 'cyberpunk') {
            message += ` and fell into a black hole to ${result.finalPosition}!`;
          } else {
            message += ` and slid down a snake to ${result.finalPosition}!`;
          }
        } else {
          message += ` and moved to ${result.finalPosition}`;
        }
        
        if (result.isWin) {
          message += ` - ${result.player.name} WINS!`;
          this.logEvent(message, 'win');
          this.announce(`${result.player.name} wins the game!`);
        } else {
          this.logEvent(message, result.applied);
          this.announce(`${result.player.name} moved to cell ${result.finalPosition}`);
        }
        
        this.updateTokens();
        this.updateTurnIndicator();
        this.renderPlayersList();
        
        if (this.game.isGameOver) {
          this.rollButton.disabled = true;
        } else {
          this.rollButton.disabled = false;
        }
      } else {
        this.rollButton.disabled = false;
        this.diceResult.textContent = 'Roll to start';
      }
    }, 600);
  }

  setDiceRolling(rolling) {
    if (rolling) {
      this.rollButton.classList.add('dice-button--rolling');
    } else {
      this.rollButton.classList.remove('dice-button--rolling');
    }
  }

  updateTurnIndicator() {
    if (this.game.isGameOver && this.game.winner) {
      this.turnIndicator.textContent = `🎉 ${this.game.winner.name} Wins! 🎉`;
    } else {
      const currentPlayer = this.game.getCurrentPlayer();
      if (currentPlayer) {
        this.turnIndicator.textContent = `${currentPlayer.name}'s turn`;
      }
    }
  }

  logEvent(message, type = '') {
    const entry = document.createElement('div');
    entry.className = 'game-log__entry';
    if (type === 'snake') {
      entry.classList.add('game-log__entry--snake');
    } else if (type === 'ladder') {
      entry.classList.add('game-log__entry--ladder');
    } else if (type === 'win') {
      entry.classList.add('game-log__entry--win');
    }
    entry.textContent = message;
    this.gameLog.prepend(entry);
    
    while (this.gameLog.children.length > 12) {
      this.gameLog.removeChild(this.gameLog.lastChild);
    }
  }

  announce(message) {
    this.ariaLiveRegion.textContent = message;
  }
}
