/**
 * @param {number[][]} grid
 * @return {number}
 
 [
 [0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]
 
 
 1 is land
 0 is water
 
 2 problemms:
 - find island
 - count sides not touching other land
 
 do dfs, count sides on each land
 */
// var islandPerimeter = function (grid) {
//   function dfs(row, col) {
//     if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 0) {
//       return 0
//     }

//     // check neighbors
//     let sum = 0

//     let next = [[row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1]]
//     let sides = 0

//     for (const [row, col] of next) {
//       if (!isValid(grid, row, col)) {
//         sides += 1
//       } else {
//         dfs(row, col)
//       }
//     }

//     sum += sides

//     return sum
//   }

var islandPerimeter = function (grid) {
  const out = 0
  let q = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        q.push([i, j])
      }
    }
  }

  let sides = 0

  for (const [row, col] of q) {
    let next = [[row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1]]

    for (const [r, c] of next) {
      if (outOfBounds(grid, r, c)) {
        sides += 1
      }
    }
  }

  return sides
};

function outOfBounds(grid, row, col) {
  return row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 0
}



console.log(islandPerimeter([[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]))