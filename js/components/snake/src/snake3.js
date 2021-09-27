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
  </style>

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

    this.grid = this.shadowRoot.querySelector('.grid')
    this.grid.innerHTML = buildGrid(BOARD_WIDTH, BOARD_HEIGHT)
    this.cells = Array.from(this.grid.querySelectorAll('.cell'))

    this.snake = [2, 1, 0]
    this.direction = DIRECTION.RIGHT
    this.directionVal = 1
    this.apple = this.#createApple()
  }

  connectedCallback() {
    window.addEventListener('keyup', this.#onKeyup.bind(this))

    this.#initSnake()
    this.#startLoop()
  }

  #initSnake() {
    this.snake.forEach(item => {
      this.cells[item].classList.add('active')
    })
  }

  #startLoop() {
    this.interval = setInterval(this.#onLoop.bind(this), SPEED);
  }

  #stopLoop() {
    clearInterval(this.interval)
  }

  #onLoop() {
    console.log('loop')
    if (this.#isOutBounds()) {
      console.log('out of bounds')
      this.#stopLoop()
      return
    }
    // check user input changes
    // update state
    this.#move()
    // render updates
    this.#render()
  }

  #move() {
    const tail = this.snake.pop()
    this.cells[tail].classList.remove('active')
    this.snake.unshift(this.snake[0] + this.directionVal)
    this.cells[this.snake[0]].classList.add('active')
  }

  #render() {
    this.#initSnake()
  }

  #getActiveCells() {
    return Array.from(this.grid.querySelectorAll('.active'))
  }

  #onKeyup(event) {
    console.log(event, event.key)
    // calc new snake
    this.#updateSnake(event.key)
  }

  #updateSnake(direction) {
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
  #isOutBounds() {
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

    // handle running into self

  }

  #createApple() {
    const apple = this.#randCell()
    console.log(apple, this.cells.length)
    this.cells[apple].classList.add('apple')
    return apple
  }

  #updateApple() {
    this.#resetApple()
    const apple = this.#createApple()
    return apple
  }

  #randCell() {
    // use floor since we have to -1 for array index anyways
    const rand = () => Math.floor(Math.random() * BOARD_WIDTH * BOARD_HEIGHT)
    let cell = rand()
    while (this.snake.includes(rand)) {
      cell = rand()
    }
    return cell
  }

  #resetApple() {
    console.log(this.apple)
    this.cells[this.apple].classList.remove('apple')
  }
})