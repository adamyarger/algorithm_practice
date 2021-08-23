
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flat(arr, depth = 1) {
  // stop recurdion when depth is hit
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 1) {
      return acc.concat(flat(val, depth - 1))
    }
    return acc.concat(val)
  }, [])
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    return flat(this, depth)
  }
}

const arr = [1, [2], [3, [4]]];

console.log(flat(arr))
// [1, 2, 3, [4]]

console.log(flat(arr, 1))
// [1, 2, 3, [4]]

console.log(arr.flat(2))
// [1, 2, 3, 4]