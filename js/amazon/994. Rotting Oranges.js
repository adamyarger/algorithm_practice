/**
 * @param {number[][]} grid
 * @return {number}
 
 graph problem
 each next to it either up down lef right is a neighbor node
 
 - find the rotten oranges
 - fill the queue with the rotton oranges
 - use level order traverals to slice the levels rotten then pop off
 - repeat and count if any live are left after return -1
 */
var orangesRotting = function (grid) {
  let { rotten, alive } = findRotten(grid)
  const q = [...rotten]
  let count = -1

  if (!q.length && !alive) return 0

  while (q.length) {
    const level = q.slice()

    level.forEach(node => {
      const [row, col] = q.shift()
      const dir = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ]

      for (const [r, c] of dir) {
        if (inBounds(grid, r, c) && grid[r][c] === 1) {
          grid[r][c] = 2
          alive -= 1
          q.push([r, c])
        }
      }
    })

    count += 1
  }

  return alive > 0 ? -1 : count
};

function inBounds(grid, row, col) {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length
}

function findRotten(grid) {
  let alive = 0
  let rotten = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const cell = grid[i][j]

      if (cell === 1) {
        alive += 1
      } else if (cell === 2) {
        rotten.push([i, j])
      }
    }
  }

  return { rotten, alive }
}