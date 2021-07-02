function flatten(arr) {
  return arr.reduce((acc, item) => {
    const next = Array.isArray(item) ? flatten(item) : item
    return acc.concat(next)
  }, [])
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function () {
    return flatten(this)
  }
}

let arr = [1, 2, [3, 4, [5, 6, [7, [8, 9, 10]]]]]
// console.log(flatten(arr))

// rule of prototypes: the object before the .fn is the this value
// i.e. the array is this
console.log(arr.flatten())
