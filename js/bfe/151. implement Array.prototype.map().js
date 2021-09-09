


/**
 * fn(element, index, array)
 * thisArg
 */
Array.prototype.myMap = function (fn, thisArg) {
  // declare length since the inner array could change the size of the array while being iterated
  const length = this.length
  // this will include empty elements
  const out = new Array(length)

  for (let i = 0; i < length; i++) {
    // skip missing array slots
    if (i in this) {
      out[i] = fn.call(thisArg, this[i], i, this)
    }
  }

  return out
}


let obj = {
  name: 'dude'
}

let arr = [1, 2, 3]

// creates a sparse array
// arrays are objects underneth and the length is always the last index + 1
// so the lenght will be 20 + 1
arr[20] = 4

let out = arr.myMap(function (item) {
  console.log(this)
  return item + 1
}, obj)

console.log(out.length)

