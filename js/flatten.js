function flat(arr, depth = 1) {
  if (depth === 0) return arr
  return arr.reduce((acc, item) => {
    const next = Array.isArray(item) ? flat(item, depth - 1) : item
    return acc.concat(next)
  }, [])
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function () {
    return flat(this)
  }
}

let arr = [1, 2, [3, 4, [5, 6, [7, [8, 9, 10]]]]]
let arr2 = [1, [2], [3, [4]]]
// console.log(flat(arr))

// rule of prototypes: the object before the .fn is the this value
// i.e. the array is this
// console.log(arr.flat())
// console.log(arr2.flat())

console.log(flat(arr2, 1))
