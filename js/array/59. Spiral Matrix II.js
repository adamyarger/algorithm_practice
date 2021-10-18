/**
 * Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.



Example 1:


Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
Example 2:

Input: n = 1
Output: [[1]]
 */

/**
 * @param {number} n
 * @return {number[][]}
 * 
 * this is similar to robot grid type simulation
 * - dont think about it like a nested array, think of it like a robot moving on the grid
 * - the goal is to move the robot along a path
 * - this is a mix between robot grid and tobot infinite plain
 * 
 * its about hitting dead ends
 * - move right till we end at [0, n-1]
 * - then change directions to down
 * 
 * 
 * recipe
 */
var generateMatrix = function (n) {
  let grid = Array(n).fill(0).map(i => Array(n).fill(0))
  let dir = [[0, 1], [-1, 0], [0, -1], [1, 0]]   //The directions in order, right, down, left, up
  let row = 0
  let col = -1
  let num = 1

  for (let i = 0; num <= n * n; i++) {
    // i is used to choose the direction from the array.
    // just like robot grid
    // get the direction, then use up that direction in the while loop until you hit the end
    // looking fo rvalue 0 acts lik a boundary
    i = i % 4
    row += dir[i][0]
    col += dir[i][1]

    // while in bounds and cell has the default value
    while (row >= 0 && col >= 0 && row < n && col < n && grid[row][col] == 0) {
      // increment num and add to cell
      grid[row][col] = num++
      // move row and cell forward based on direction
      row += dir[i][0]
      col += dir[i][1]
    }

    // we went out of bounds, this set it back in bounds
    row -= dir[i][0]
    col -= dir[i][1]
  }
  return grid
};