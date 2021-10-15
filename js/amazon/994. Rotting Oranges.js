/**
 * @param {number[][]} grid
 * @return {number}
 
 bfs
 think of it like a tree
 you can queue up you neigbors next
 
 find starting nodes that are rotten
 
 */
var orangesRotting = function (grid) {
  const start = findDead(grid, 0, 0)

  const q = start.dead
  if (!start.dead.length) {
    if (start.alive.length) return -1
    else return 0
  }
  let count = -1

  while (q.length) {
    const level = q.slice()
    level.forEach(_ => {
      const [row, col] = q.shift()

      const options = [
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
      ]

      options.forEach(([r, c]) => {
        if (inBounds(grid, r, c) && grid[r][c] === 1) {
          q.push([r, c])
          grid[r][c] = 2
        }
      })
    })

    count += 1
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        return -1
      }
    }
  }

  return count
};

function inBounds(grid, row, col) {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length
}

function findDead(grid, row, col) {
  const out = {
    dead: [],
    alive: [],
    none: []
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const cell = grid[i][j]

      if (cell === 2) {
        out.dead.push([i, j])
      } else if (cell === 1) {
        out.alive.push([i, j])
      } else {
        out.none.push([i, j])
      }
    }
  }

  return out
}