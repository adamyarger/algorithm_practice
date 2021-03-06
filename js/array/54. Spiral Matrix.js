/**
 * Given an m x n matrix, return all elements of the matrix in spiral order.



Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:


Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 */

var spiralOrder = function (matrix) {
  const res = []
  // move towards base case by popping off
  while (matrix.length) {
    const first = matrix.shift()
    // why spread? becuase first is an array
    res.push(...first)

    // [ 
    // [ 4, 5, 6 ], 
    // [ 7, 8, 9 ] ] is left

    for (const m of matrix) {
      let val = m.pop()
      if (val) {
        res.push(val)
        m.reverse()
        // 5,4
        // 8,7
      }
    }

    matrix.reverse()
    // 8,7
    // 5,4
  }
  return res
}


let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
console.log(spiralOrder(matrix))
//Output: [1,2,3,6,9,8,7,4,5]