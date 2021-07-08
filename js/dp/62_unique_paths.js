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
  const memo = Array(m).fill(-1).map(item => Array(n).fill(-1))
  return recur(memo, m - 1, n - 1, 0, 0)
};

function recur(memo, m, n, cur_m, cur_n) {
  // can only move m and n up in array values for down and right
  // were counting to exit with zero to be added
  if (cur_m > m || cur_n > n) return 0

  if (cur_m == m && cur_n == n) return 1

  if (memo[cur_m][cur_n] !== -1) {
    return memo[cur_m][cur_n]
  }

  memo[cur_m][cur_n] = recur(memo, m, n, cur_m + 1, cur_n) + recur(memo, m, n, cur_m, cur_n + 1)

  return memo[cur_m][cur_n]
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