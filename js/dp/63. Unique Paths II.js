/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const grid = obstacleGrid
  const memo = Array(grid.length).fill(-1).map(_ => Array(grid[0].length).fill(-1))
  return dfs(grid, grid.length - 1, grid[0].length - 1, memo)
};

function dfs(grid, row, col, memo) {
  if (row < 0 || col < 0 || grid[row][col] !== 0) return 0

  if (row === 0 && col === 0) return 1

  if (memo[row][col] !== -1) return memo[row][col]

  memo[row][col] = dfs(grid, row - 1, col, memo) + dfs(grid, row, col - 1, memo)

  return memo[row][col]
}
