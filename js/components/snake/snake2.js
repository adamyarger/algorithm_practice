
// settings.js
const GAME_ROWS = 15
const GAME_COLS = 15
const INIT_LENGTH = 3

// position.js
class Position {
  row
  col

  constructor({ row, col } = {}) {
    this.row = row
    this.col = col
  }
}

const DIRECTIONS = {
  UP: Symbol(),
  DOWN: Symbol(),
  LEFT: Symbol(),
  RIGHT: Symbol(),
}

// apple.js
class Apple {
  position
  color = '#0f0'

  constructor() {
    this.position = new Position({
      col: Math.floor(Math.random() * GAME_COLS),
      row: Math.floor(Math.random() * GAME_ROWS),
    })
  }

  render(ctx) {
    ctx.save()

    // const cellWidth = ctx.
  }
}

// snake.js
class Snake {
  elements = []
  color = '#000'
  direction = DIRECTIONS.RIGHT
  lastPosition = new Position({ row: 0, col: 0 })

  constructor({ length } = {}) {
    this.#initSnake({ length })
  }

  #initSnake({ length }) {
    let centerRow = Math.floor(GAME_ROWS / 2)
    let centerCol = Math.floor(GAME_COLS / 2)

    for (let i = 0; i < length; i++) {
      this.elements.push(new Element({ row: centerRow, col: centerCol }))
    }
  }
}

// each element handles its own logic
// it can either move up down left or right

// game.js

function buildGrid(size) {
  let html = ''
  for (let i = 0; i < size; i++) {
    html += `<div class="cell"></div>`
  }
  return html
}

const CELL_SIZE = 25

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(${GAME_COLS}, ${CELL_SIZE}px);
    }

    .cell {
      width: ${CELL_SIZE}px;
      height: ${CELL_SIZE}px;
      border: 1px solid blue;
    }
  </style>

  <div class="grid">
    ${buildGrid(GAME_COLS * GAME_ROWS)}
  </div>
`

customElements.define('snake-game', class SnakeGame extends HTMLElement {
  snake = [0, 1, 2]

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {

  }
})