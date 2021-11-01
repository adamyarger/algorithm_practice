/**
 * @param {number[][]} grid
 * @return {number}
 
 [
 [1,1,1],
 [1,0,0],
 [1,0,1],
 ]
 
 - trickt part is detecting detached islands
 - strongly connected components
 
 - brute force = try each 0 and count island size
 - heruistic, only try zeros that are touching and island
 - could kick start bfs with 0 touch 1's

 */
// var largestIsland = function (grid) {
//   const zeros = findZeros(grid)
//   let max = 0

//   console.log(zeros)

//   // now test which flipped 0 will yield the most connections
//   for (const [row, col] of zeros) {
//     max = Math.max(max, checkIslandSize(grid, row, col))
//   }

//   return max
// };

// function checkIslandSize(grid, row, col) {
//   // do backtracking with tombstones instead
//   let size = 0
//   grid[row][col] = 1

//   function backtrack(row, col) {
//     if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] !== 1) {
//       return
//     }

//     size += 1;
//     const val = grid[row][col]
//     grid[row][col] = '#';
//     const dir = [[row, col + 1], [row, col - 1], [row + 1, col], [row - 1, col]];

//     for (const [r, c] of dir) {
//       backtrack(r, c)
//     }

//     grid[row][col] = val
//   }

//   backtrack(row, col)
//   grid[row][col] = 0

//   return size
// }

// function findZeros(grid) {
//   const zeros = []

//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[0].length; j++) {
//       if (grid[i][j] === 1) {
//         // check all for ways for zeros that are touching
//         zeros.push(...checkNeighbors(grid, i, j))
//       }
//     }
//   }

//   return zeros
// }

// function checkNeighbors(grid, row, col) {
//   const dir = [[row, col + 1], [row, col - 1], [row + 1, col], [row - 1, col]]
//   const out = []

//   for (const [r, c] of dir) {
//     if (r >= 0 && c >= 0 && r < grid.length && c < grid[0].length && grid[r][c] === 0) {
//       out.push([r, c])
//     }
//   }

//   return out
// }




const grid = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 0, 1],
]

console.log(largestIsland(grid))