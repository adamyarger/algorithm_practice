/**
 * Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's, and return the matrix.

You must do it in place.



Example 1:


Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
Example 2:


Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 */


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * 
 * 
 * if zero is found all 4 ways and set to zero, but those 0's dont count as trigger 0's
 * could set 0's to #'s like in find islands so we can tel the difference
 * this would mean 2 loops 1 for setting and one for replacing
 * 
 * should be able to do this linearly
 * 
 */
var setZeroes = function (matrix) {
  const rows = []
  const cols = []

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      // save row and cols that have zeros
      // when we see one thats not a 0 set it to a hashtag
      if (matrix[row][col] === 0) {
        rows.push(row)
        cols.push(col)
      }
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      // save row and cols that have zeros
      // when we see one thats not a 0 set it to a hashtag
      if (rows.includes(row)) {
        matrix[row][col] = 0
      }
      if (cols.includes(col)) {
        matrix[row][col] = 0
      }
    }
  }

  return matrix
};

var matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
console.log(setZeroes(matrix))

matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
console.log(setZeroes(matrix))