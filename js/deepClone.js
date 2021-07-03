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
  // If the source isn't an Object or Array, throw an error.
  if (!(source instanceof Object) || source instanceof Date || source instanceof String) {
    throw 'Only Objects or Arrays are supported.'
  }

  // Set the target data type before copying.
  var target = source instanceof Array ? [] : {};

  for (let prop in source) {
    // Make sure the property isn't on the protoype
    if (source instanceof Object && !(source instanceof Array) && !(source.hasOwnProperty(prop))) {
      continue;
    }

    // If the current property is an Array or Object, recursively clone it, else copy it's value
    if (source[prop] instanceof Object && !(source[prop] instanceof Date) && !(source[prop] instanceof String)) {
      target[prop] = deepClone(source[prop])
    } else {
      target[prop] = source[prop]
    }
  }

  return target;
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

