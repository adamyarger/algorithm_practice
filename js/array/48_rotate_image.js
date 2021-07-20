/**
 * You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.



Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
 */


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * 
 * STEPS
 * transpose the matrix (swap i,j and j, i)
 * when we transpose we only iterate through the top diagnal half
 * just like in longest palindromic subsequence
 * WHY? because if we go through everything well switch spots twice and en up with our orignal array
 * reverse each row
 * 
 */
var rotate = function (matrix) {
  const len = matrix[0].length

  // loops through rows (this only works on perfect squares)
  for (let i = 0; i < len; i++) {
    // loop through cols
    // start j at i because we already swapped that one
    for (let j = i; j < len; j++) {
      // transpose transpose is switching row and column indexes
      let temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }

  // reverse each row
  for (let i = 0; i < len; i++) {
    // Math.floor(len/2) is the mid point
    for (let j = 0; j < Math.floor(len / 2); j++) {
      temp = matrix[i][j]
      matrix[i][j] = matrix[i][len - 1 - j]
      matrix[i][len - 1 - j] = temp
    }
  }
};

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

rotate(matrix)

console.log(matrix)