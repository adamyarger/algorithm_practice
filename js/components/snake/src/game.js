

(function () {
  const SIZE = 15
  const CELL_SIZE = 25
  const KEYS = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  }

  const template = document.createElement('template')

  template.innerHTML = `
    <style>
      .grid {
        display: grid;
        grid-template-columns: repeat(${SIZE}, ${CELL_SIZE}px);
      }

      .cell {
        border: 1px solid #333;
        width: ${CELL_SIZE}px;
        height: ${CELL_SIZE}px;
      }

      .cell.active {
        background-color: #333;
      }
    </style>

    <div class="grid"></div>
  `

  function buildCells(size) {
    let cells = []
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cells.push(cell)
    }
    return cells
  }

  customElements.define('snake-game', class SnakeGame extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.grid = this.shadowRoot.querySelector('.grid')
      this.cells = buildCells(SIZE)
      this.cells.forEach(cell => {
        this.grid.appendChild(cell)
      })

      this.snake = [2, 1, 0]
      this.index = 0
      this.direction = 'right'
      this.directionVal = 1
      this.intervalTime = 300
    }

    connectedCallback() {
      this.initSnake()
      this.move()
      this.interval = setInterval(this.moveOutcome.bind(this), this.intervalTime)

      window.addEventListener('keyup', this.onKeyDown.bind(this))
    }

    onKeyDown(event) {
      // shoud NOT be able to do oppsoite command
      console.log(event)
      switch (event.keyCode) {
        case KEYS.left:
          this.direction = 'left'
          this.directionVal = -1
          break;
        case KEYS.up:
          this.direction = 'up'
          this.directionVal = -1
          this.directionVal -= SIZE - 1
          break;
        case KEYS.right:
          this.direction = 'right'
          this.directionVal = 1
          break;
        case KEYS.down:
          this.direction = 'down'
          // for ward 1 like normal, then down by adding size - 1
          this.directionVal = 1
          this.directionVal += SIZE - 1
          break;
        default:
          break;
      }
    }

    initSnake() {
      this.snake.forEach(index => {
        this.cells[index].classList.add('active')
      })
    }

    move() {
      let tail = this.snake.pop()
      this.cells[tail].classList.remove('active')
      this.snake.unshift(this.snake[0] + this.directionVal)

      this.cells[this.snake[0]].classList.add('active')
    }

    moveOutcome() {
      // check for running into borders
      // chekc if apple eaten
      console.log(this.snake)
      if (!this.isOutOfBounds()) {
        this.move()
      } else {
        clearInterval(this.interval)
      }
    }

    isOutOfBounds() {
      // find edges. if part of snale is past edge throw game
      const head = this.snake[0]
      const size = SIZE
      // size will be added when gogin down, so check if its bigger than the last cell
      if (head + size >= size * size && this.direction === 'down') {
        return true
      }

      if (head - size < 0 && this.direction === 'up') {
        return true
      }

      if (head % size === size - 1 && this.direction === 'right') {
        return true
      }

      if (head % size === 0 && this.direction === 'left') {
        return true
      }

      // handle snake coliding with self

      return false
    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {

    }
  })
})()