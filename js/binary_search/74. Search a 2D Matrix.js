


var searchMatrix = function (matrix, target) {
  let left = 0
  let right = (matrix.length * matrix[0].length) - 1

  const get = i => {
    const row = Math.floor(i / matrix[0].length)
    const col = i % matrix[0].length
    console.log('calc: ', row, col)
    return matrix[row][col]
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    console.log(mid)
    const val = get(mid)

    if (val === target) {
      return true
    } else if (val < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return false
};


// console.log(searchMatrix([[1, 1]], 2))

console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3))

