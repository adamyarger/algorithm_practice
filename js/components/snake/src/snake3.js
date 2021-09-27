/**
 * apple generate class
 * game logic class
 *  - scores
 *  - reset or begin game
 * snake logic
 *  - handle controls
 *  - grow snake
 */
const CELL_WIDTH = 25
const BOARD_WIDTH = 15
const BOARD_HEIGHT = 15
const SPEED = 200

const KEYS = Object.freeze({
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
})

const DIRECTION = Object.freeze({
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left',
})

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .grid {
      justify-content: center;
      display: grid;
      grid-template-columns: repeat(${BOARD_WIDTH}, ${CELL_WIDTH}px);
    }

    .cell {
      width: ${CELL_WIDTH}px;
      height: ${CELL_WIDTH}px;
      border: 1px solid blue;
    }

    .cell.active {
      background: #000;
    }

    .cell.apple {
      background-color: red;
    }

    .score {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 1rem 0;
    }

    .score__value {
      padding-left: 1rem;
      font-weight: bold;
    }
  </style>

  <div class="score">
    Score: <span class="score__value">0</span>
  </div>
  <div class="grid"></div>
`

function buildGrid(width, height) {
  let temp = ''
  for (let i = 0; i < width * height; i++) {
    temp += `<div class="cell"></div>`
  }
  return temp
}


customElements.define('snake-game', class SnakeGame extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.score = 0
    this.scoreEl = this.shadowRoot.querySelector('.score__value')
    this.grid = this.shadowRoot.querySelector('.grid')
    this.grid.innerHTML = buildGrid(BOARD_WIDTH, BOARD_HEIGHT)
    this.cells = Array.from(this.grid.querySelectorAll('.cell'))

    // this.snake = [2, 1, 0]
    this.snake = [8, 7, 6, 5, 4, 3, 2, 1, 0]
    this.direction = DIRECTION.RIGHT
    this.directionVal = 1
    this.apple = this.createApple()
  }

  connectedCallback() {
    window.addEventListener('keydown', this.onKeydown.bind(this))

    this.initSnake()
    this.startLoop()
  }

  initSnake() {
    this.snake.forEach(item => {
      this.cells[item].classList.add('active')
    })
  }

  startLoop() {
    this.interval = setInterval(this.onLoop.bind(this), SPEED);
  }

  stopLoop() {
    clearInterval(this.interval)
  }

  onLoop() {
    if (this.isOutBounds()) {
      this.stopLoop()
      return
    }
    const tail = this.tail
    window.requestAnimationFrame(() => this.move())
    this.eat(tail)
  }

  move() {
    const tail = this.snake.pop()
    this.cells[tail].classList.remove('active')
    this.snake.unshift(this.snake[0] + this.directionVal)
    this.cells[this.snake[0]].classList.add('active')
  }

  onKeydown(event) {
    if (!this.isBlockedDirection(event.key)) {
      this.updateSnake(event.key)
    }
  }

  isBlockedDirection(key) {
    if (this.direction === DIRECTION.RIGHT && key === KEYS.LEFT) return true
    if (this.direction === DIRECTION.LEFT && key === KEYS.RIGHT) return true
    if (this.direction === DIRECTION.UP && key === KEYS.DOWN) return true
    if (this.direction === DIRECTION.DOWN && key === KEYS.UP) return true
    return false
  }

  updateSnake(direction) {
    switch (direction) {
      case KEYS.UP:
        this.direction = DIRECTION.UP
        this.directionVal = -1 - (BOARD_HEIGHT - 1)
        break;
      case KEYS.DOWN:
        this.direction = DIRECTION.DOWN
        this.directionVal = 1 + (BOARD_HEIGHT - 1)
        break;
      case KEYS.LEFT:
        this.direction = DIRECTION.LEFT
        this.directionVal = -1
        break;
      case KEYS.RIGHT:
        this.direction = DIRECTION.RIGHT
        this.directionVal = 1
        break;
      default:
        break;
    }
  }

  /**
   * 
   * run this before the next update
   * check if current head is at the border and still going a direction
   */
  isOutBounds() {
    const head = this.snake[0]

    if (this.direction === DIRECTION.RIGHT && head % BOARD_WIDTH === BOARD_WIDTH - 1) {
      return true
    }

    if (this.direction === DIRECTION.DOWN && (head + BOARD_HEIGHT) >= (BOARD_WIDTH * BOARD_HEIGHT)) {
      return true
    }

    if (this.direction === DIRECTION.LEFT && head % BOARD_WIDTH === 0) {
      return true
    }

    if (this.direction === DIRECTION.UP && (head - BOARD_HEIGHT) < 0) {
      return true
    }

    if (this.snake.filter(cell => cell === head).length === 2) {
      return true
    }
  }

  createApple() {
    const apple = this.randCell()
    this.cells[apple].classList.add('apple')
    return apple
  }

  updateApple() {
    this.resetApple()
    const apple = this.createApple()
    return apple
  }

  randCell() {
    // use floor since we have to -1 for array index anyways
    const rand = () => Math.floor(Math.random() * BOARD_WIDTH * BOARD_HEIGHT)
    let cell = rand()
    while (this.snake.includes(rand)) {
      cell = rand()
    }
    return cell
  }

  resetApple() {
    this.cells[this.apple].classList.remove('apple')
  }

  eat(tail) {
    if (this.snake.includes(this.apple)) {
      this.grow(tail)
      this.apple = this.updateApple()
      this.updateScore()
    }
  }

  updateScore() {
    this.score += 1
    this.scoreEl.innerHTML = this.score
  }

  grow(tail) {
    this.snake.push(tail)
  }

  get tail() {
    return this.snake[this.snake.length - 1]
  }
})