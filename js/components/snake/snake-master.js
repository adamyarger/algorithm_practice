// settings.js
const GAME_ROWS = 15;
const GAME_COLS = 15;
const INITIAL_SNAKE_LENGTH = 3;

// position.js
class Position {
  row;
  col;
  constructor({ row, col } = {}) {
    this.row = row;
    this.col = col;
  }
}

const DIRECTIONS = {
  UP: Symbol(),
  DOWN: Symbol(),
  LEFT: Symbol(),
  RIGHT: Symbol(),
};

// Apple.js
class Apple {
  position;
  color = '#0f0';
  constructor() {
    this.position = new Position({
      col: Math.floor(Math.random() * GAME_COLS),
      row: Math.floor(Math.random() * GAME_ROWS),
    });
  }

  render(ctx) {
    ctx.save();

    const cellWidth = ctx.canvas.width / GAME_COLS;
    const cellHeight = ctx.canvas.height / GAME_ROWS;

    ctx.fillStyle = this.color;
    ctx.fillRect(
      cellWidth * this.position.col + cellWidth * 0.2,
      cellHeight * this.position.row + cellHeight * 0.2,
      cellWidth * 0.6,
      cellHeight * 0.6
    );

    ctx.restore();
  }
}

// Snake.js
class Snake {
  elements = [];
  color = '#000';
  direction = DIRECTIONS.RIGHT;
  lastPosition = new Position({ row: 0, col: 0 });

  constructor({ length } = {}) {
    this.#initSnake({ length });
  }

  #initSnake({ length }) {
    let centerRow = Math.floor(GAME_ROWS / 2);
    let centerCol = Math.floor(GAME_COLS / 2);

    for (let i = 0; i < length; i++) {
      this.elements.push(new Element({ row: centerRow, col: centerCol - i }));
    }
  }

  steer(direction) {
    this.direction = direction;
  }

  move() {
    this.lastPosition = new Position({
      row: this.tail.position.row,
      col: this.tail.position.col,
    });
    for (let i = this.elements.length - 1; i > 0; i--) {
      this.elements[i].moveTo(this.elements[i - 1]);
    }
    this.head.move(this.direction);
  }

  grow() {
    this.elements.push(new Element(this.lastPosition));
  }

  render(ctx) {
    for (const element of this.elements) {
      element.render(ctx);
    }
  }

  get head() {
    return this.elements[0];
  }

  get tail() {
    return this.elements[this.elements.length - 1];
  }

  wouldDie() {
    return this.wouldMoveOutOfBounds() || this.wouldSelfKill();
  }

  wouldSelfKill() {
    const predictedPosition = this.head.predictPosition(this.direction);
    for (const element of this.elements.slice(1)) {
      if (
        predictedPosition.row == element.position.row &&
        predictedPosition.col == element.position.col
      ) {
        return true;
      }
    }
    return false;
  }

  wouldMoveOutOfBounds() {
    const predictedPosition = this.head.predictPosition(this.direction);
    return (
      predictedPosition.row < 0 ||
      predictedPosition.row >= GAME_ROWS ||
      predictedPosition.col < 0 ||
      predictedPosition.col >= GAME_COLS
    );
  }

  touches(position) {
    for (const element of this.elements) {
      if (
        position.row == element.position.row &&
        position.col == element.position.col
      ) {
        return true;
      }
    }
    return false;
  }
}

class Element {
  position;
  constructor({ row, col } = {}) {
    this.position = new Position({ row, col });
  }

  moveTo(element) {
    this.position.row = element.position.row;
    this.position.col = element.position.col;
  }

  move(direction) {
    switch (direction) {
      case DIRECTIONS.UP:
        this.position.row--;
        break;
      case DIRECTIONS.DOWN:
        this.position.row++;
        break;
      case DIRECTIONS.LEFT:
        this.position.col--;
        break;
      case DIRECTIONS.RIGHT:
        this.position.col++;
        break;
    }
  }

  predictPosition(direction) {
    const res = new Position({
      row: this.position.row,
      col: this.position.col,
    });
    switch (direction) {
      case DIRECTIONS.UP:
        res.row--;
        break;
      case DIRECTIONS.DOWN:
        res.row++;
        break;
      case DIRECTIONS.LEFT:
        res.col--;
        break;
      case DIRECTIONS.RIGHT:
        res.col++;
        break;
    }
    return res;
  }

  render(ctx) {
    ctx.save();

    const cellWidth = ctx.canvas.width / GAME_COLS;
    const cellHeight = ctx.canvas.height / GAME_ROWS;

    ctx.fillStyle = this.color;
    ctx.fillRect(
      cellWidth * this.position.col + cellWidth * 0.2,
      cellHeight * this.position.row + cellHeight * 0.2,
      cellWidth * 0.6,
      cellHeight * 0.6
    );

    ctx.restore();
  }
}

// Game.js
class Game {
  #snake;
  canvas;
  #ctx;
  apple;
  updateInterval;

  constructor(htmlCanvas) {
    this.canvas = htmlCanvas;
    this.#ctx = this.canvas.getContext('2d');
    this.initEventListeners();
    this.reset();
  }

  initEventListeners() {
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  loose() {
    clearInterval(this.updateInterval);
    this.updateInterval = 0;
  }

  start() {
    this.updateInterval = setInterval((_) => this.loop(), 300);
  }

  loop() {
    this.update();
    window.requestAnimationFrame((_) => this.render());
  }

  onKeyDown(e) {
    //   console.log(e);
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        this.#snake.steer(DIRECTIONS.UP);
        break;
      case 'ArrowDown':
      case 's':
        this.#snake.steer(DIRECTIONS.DOWN);
        break;
      case 'ArrowLeft':
      case 'a':
        this.#snake.steer(DIRECTIONS.LEFT);
        break;
      case 'ArrowRight':
      case 'd':
        this.#snake.steer(DIRECTIONS.RIGHT);
        break;
    }
    if (!this.updateInterval) {
      this.start();
    }
  }

  reset() {
    this.#snake = new Snake({ length: INITIAL_SNAKE_LENGTH });
    this.spawnApple();
  }

  spawnApple() {
    this.apple = new Apple(this.#snake.elements.map((e) => e.position));
  }

  resizeCanvas() {
    const bcr = this.canvas.getBoundingClientRect();
    this.canvas.width = bcr.width;
    this.canvas.height = bcr.height;
  }

  update() {
    if (this.#snake.wouldDie()) {
      this.reset();
      this.loose();
      return;
    }
    this.#snake.move(DIRECTIONS.RIGHT);
    if (this.#snake.touches(this.apple.position)) {
      console.log('touches');
      this.#snake.grow();
      this.spawnApple();
    }
  }

  render() {
    this.#ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.apple.render(this.#ctx);
    this.#snake.render(this.#ctx);

    const cellWidth = this.#ctx.canvas.width / GAME_COLS;
    const cellHeight = this.#ctx.canvas.height / GAME_ROWS;
    let centerCol = Math.floor(GAME_COLS / 2);

    this.#ctx.fillStyle = '#000';
    this.#ctx.font = "30px Arial";
    this.#ctx.fillText(
      this.#snake.elements.length - INITIAL_SNAKE_LENGTH,
      cellWidth * centerCol,
      cellHeight
    );
  }
}



// main.js
const game = new Game(document.querySelector('#main_game'));
game.resizeCanvas();
game.render();