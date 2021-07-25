/**
 * 
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?



Example 1:


Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
Example 3:

Input: m = 7, n = 3
Output: 28
Example 4:

Input: m = 3, n = 3
Output: 6
 */


/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * 
 * were adding paths together since our output is a count of possibilities
 * this is like the staircase or fibonacci problems, take 1 step or 2 steps
 * move down or right
 * could we start at the end spot and subtract looking for 0?
 * check for base case of being out of bounds
 */
var uniquePaths = function (m, n) {
  const memo = Array(m).fill(-1).map(_ => Array(n).fill(-1))
  return dfs(memo, m - 1, n - 1)
};

function dfs(memo, m, n) {
  if (m === 0 && n === 0) return 1
  if (m < 0 || n < 0) return 0

  if (memo[m][n] !== -1) return memo[m][n]

  memo[m][n] = dfs(memo, m - 1, n) + dfs(memo, m, n - 1)

  return memo[m][n]
}

// console.log(uniquePaths(3, 3))

/**
 * 
 * @param {*} m 
 * @param {*} n 
 * @returns 
 * 
 * since all grids with either 1 width or 1 height have 1 path possible, we can skip the 
 * first iteraction then just start adding together like fibonacci
 */
function bottomUp(m, n) {
  const memo = Array(m).fill(1).map(_ => Array(n).fill(1))

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      memo[row][col] = memo[row - 1][col] + memo[row][col - 1]
    }
  }

  return memo[m - 1][n - 1]
}

console.log(bottomUp(3, 7))