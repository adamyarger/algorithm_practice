/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.



Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 * 
 * 
 * 
 * @param {character[][]} grid
 * @return {number}
 */


/**
 * if no grid return 0
 * keep count
 * loop through grid row and col they might not be the same length
 * if val is 1 DFS and add 1 to count
 * 
 * dfs function
 * if i is out of bounds or j is out of bounds or value is not equal to 1 RETURN
 * else dfs all 4 directions
 */
var numIslands = function (grid) {
  if (!grid) {
    return 0
  }
  let count = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] == '1') {
        dfs(grid, row, col)
        count += 1
      }
    }
  }
  return count
}

//this function finds all connected 1's and cancels them out
// then we add 1 to the count and look for more
function dfs(grid, row, col) {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] != '1') {
    return
  }
  // we cancel out all the grid cells so the loop will skip over them next time
  grid[row][col] = '#'
  dfs(grid, row + 1, col)
  dfs(grid, row, col + 1)
  dfs(grid, row - 1, col)
  dfs(grid, row, col - 1)
}

const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
]

console.log(numIslands(grid))