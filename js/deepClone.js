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
function deepClone(source) {
  if (!isCloneable(source)) {
    throw new Error('Only Objects or Arrays are supported.')
  }

  var target = Array.isArray(source) ? [] : {}

  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (isCloneable(source[prop])) {
        target[prop] = deepClone(source[prop])
      } else {
        target[prop] = source[prop]
      }
    }
  }

  return target;
}

function isCloneable(val) {
  return Array.isArray(val) || Object.prototype.toString.call(val) === '[object Object]'
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
clone.b.arr.push('foo')
console.log(clone)
console.log(obj)

// this doesnt work
// clone.b.c = 'dude' => 
// this change both clone and obj since it does a shallow clone the deeper stuff is still by reference
// console.log(clone)
// console.log(obj)
// const clone = Object.assign({}, obj)

