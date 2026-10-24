# JavaScript Best Practices

Mandatory standards for game logic in this project.

## 1. ES6+ Modular, Vanilla JS

- Use modern JavaScript (ES6+) with `const`/`let` (never `var`), arrow functions when they improve clarity, destructuring, template literals, and ES modules (`import`/`export`).
- **External libraries or frameworks are prohibited.** Everything must be implemented in Vanilla JS.
- One file per module with a single responsibility and explicit imports:

```
src/
├── main.js
├── game/
│   ├── Game.js
│   ├── Board.js
│   ├── Dice.js
│   └── Player.js
├── ui/
│   └── render.js
└── utils/
    └── random.js
```

- Load the entry point with `<script type="module" src="./src/main.js"></script>`.
- Do not pollute the global scope.

## 2. Object-Oriented or Modular Design

- Model the game domain with classes or modules following single responsibility:
  - `Game`: orchestrates global state, turns, and win conditions.
  - `Dice`: encapsulates random generation and dice results.
  - `Player`: represents each player (position, name, state).
  - `Board`: knows cells, snakes and ladders, and resolves movement.
- Keep state in a single source of truth and expose clear methods to mutate it.

```js
export class Dice {
  #sides;

  constructor(sides = 6) {
    this.#sides = sides;
  }

  roll() {
    return Math.floor(Math.random() * this.#sides) + 1;
  }
}
```

- Use private fields (`#`) for internal state that should not be exposed.
- Keep presentation logic out of the model; delegate rendering to the UI layer.

## 3. Centralized Events and Pure Functions

- Register events from a single entry point (e.g., `main.js` or `events.js`), avoiding scattered handlers.
- Listeners must be thin: capture the event, extract data, and delegate to domain logic.
- Prefer **event delegation** for dynamically generated board elements and controls.
- Separate **pure functions** (no side effects, same input → same output) from those that manipulate the DOM or state:

```js
export const calculateNextPosition = (current, roll, boardSize) =>
  Math.min(current + roll, boardSize);

export const resolveCell = (position, snakes, ladders) =>
  snakes[position] ?? ladders[position] ?? position;
```

- Pure functions must be easy to test and must not depend on global variables.
- Handle errors explicitly; do not swallow exceptions.

## 4. Naming and Comments

- Use **camelCase** for variables and functions: `currentPlayer`, `rollDice()`, `moveToken()`.
- Use **PascalCase** for classes and constructors: `Game`, `Player`, `Board`.
- Use **UPPER_SNAKE_CASE** for configuration constants: `BOARD_SIZE`, `MAX_PLAYERS`.
- Use descriptive names consistent with technical English; avoid abbreviations and single-letter names.
- Use action verbs for functions: `get`, `set`, `calculate`, `render`, `handle`.
- **Descriptive comments** should only be used where they provide context (decisions, game rules, non-obvious calculations). Avoid comments that repeat what the code already expresses.
- Use JSDoc to document public contracts of classes and functions:

```js
/**
 * Moves a player's token and applies snakes or ladders.
 * @param {Player} player - The player to move.
 * @param {number} roll - The dice result.
 * @returns {number} The final position of the player.
 */
```

## 5. Quality

- No dead code, unused variables, or debugging `console.log` in final delivery.
- Use strict equality (`===` / `!==`).
- Handle edge cases: exact win, out of board positions, invalid turns.
- Keep code free of hidden side effects and circular dependencies.
