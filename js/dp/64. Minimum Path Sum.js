/**
 * Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.



Example 1:


Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
Example 2:

Input: grid = [[1,2,3],[4,5,6]]
Output: 12
 */

/**
 * @param {number[][]} grid
 * @return {number}
 * 
 * if out of bounds return infinity so it doesn tget chosen
 * 
 * WHAT I MISSED!!!
 * - return inifinity when out of bounds
 * - add current value to min comparison
 */
var minPathSum = function (grid) {
  const memo = Array(grid.length).fill(-1).map(_ => Array(grid[0].length).fill(-1))
  return dfs(memo, grid, 0, 0)
};

function dfs(memo, grid, row, col) {
  if (row === grid.length - 1 && col === grid[0].length - 1) {
    return grid[row][col]
  }

  if (row === grid.length || col === grid[0].length) {
    return Infinity
  }

  if (memo[row][col] !== -1) return memo[row][col]

  let right = dfs(memo, grid, row + 1, col)
  let down = dfs(memo, grid, row, col + 1)
  // sum === min or right or left plus current value
  memo[row][col] = Math.min(right, down) + grid[row][col]
  return memo[row][col]
}

console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]))