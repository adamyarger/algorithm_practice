function flatten(arr) {
  return arr.reduce((acc, next) => {
    const isArray = Array.isArray(next)
    return acc.concat(isArray ? flatten(next) : next)
  }, [])
}

// make it available as an array method.
if (!Array.prototype.flatten) {
  Array.prototype.flatten = function () {
    // need to return this for chaining
    console.log(this)
    return flatten(this)
  }
}

let arr = [1, 2, [3, 4, [5, 6, [7, [8, 9, 10]]]]]
// console.log(flatten(arr))

// rule of prototypes: the object before the .fn is the this value
// i.e. the array is this
console.log(arr.flatten())
