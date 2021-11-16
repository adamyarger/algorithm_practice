/**
 * @param {number[][]} matrix
 * @return {number}
 
 - use memo to track length from each cell
 */
var longestIncreasingPath = function (matrix) {
  if (!matrix.length) return 0
  const rows = matrix.length
  const cols = matrix[0].length
  const memo = Array(rows).fill(-1).map(_ => Array(cols).fill(-1))

  function dfs(row, col, min) {
    if (row < 0 || col < 0 || row >= rows || col >= cols) return 0

    if (matrix[row][col] <= min) return 0

    if (memo[row][col] !== -1) return memo[row][col]

    let count = Math.max(
      dfs(row + 1, col, matrix[row][col]),
      dfs(row - 1, col, matrix[row][col]),
      dfs(row, col + 1, matrix[row][col]),
      dfs(row, col - 1, matrix[row][col]),
    ) + 1

    memo[row][col] = count
    return count
  }

  let max = 0

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      max = Math.max(max, dfs(i, j, -Infinity))
    }
  }

  return max
};