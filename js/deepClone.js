// https://github.com/angus-c/just/blob/master/packages/object-extend/index.js
/**
 * What are the edges cases? Thats the point of this question.
 * - copy each item in an object
 * - copy each item in an array
 * - null is an object
 * - use hasOwnProperty with for in loop since it includes __proto__ fields as well
 * - should be able to handle arrays
 * @param {*} obj 
 * @returns 
 */
function deepClone(obj) {
  const out = {}
  function recur(obj) {
    for (let key in obj) {
      const cur = obj[key]
      const base = Array.isArray(cur) ? [] : {}
      if (isCloneable(cur)) {
        out[key] = recur(cur)
      }
      out[key] = Object.prototype.hasOwnProperty.call(obj, key) && !isUnextendable(obj[key])
        ? obj[key]
        : base
    }
  }
  return recur(out, obj)
}

function isCloneable(obj) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]'
}

function isUnextendable(val) {
  return !val || (typeof val != 'object' && typeof val != 'function');
}


const obj = {
  a: 'b',
  b: {
    c: 'a',
    arr: [1, 2, 3],
    d: {
      f() {
        return 'f'
      },
      noop: null
    }
  }
}

const clone = deepClone(obj)
// clone.b.c = 'nice'
// clone.b.arr.push('foo')
console.log(clone)
console.log(obj)

// this doesnt work
// clone.b.c = 'dude' => 
// this change both clone and obj since it does a shallow clone the deeper stuff is still by reference
// console.log(clone)
// console.log(obj)
// const clone = Object.assign({}, obj)

