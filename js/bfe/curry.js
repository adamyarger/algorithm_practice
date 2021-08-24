/**
 * why use this?
 * whats the difference between partial application?
 * https://johnresig.com/blog/partial-functions-in-javascript/
 * 
 * @param {*} fn 
 * @returns 
 */

// whats happening when you do it manually
// this is a recursive stack
function naive(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c)
      }
    }
  }
}

function vcurry(fn) {
  // we dont know the args count
  // it needs to be named so we can call it recursivly
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

const curry = fn => function curried(...args) {
  return args.length >= fn.length ? fn(...args) : (...args2) => curried(...args, ...args2)
}


function sum(a, b, c) {
  return a + b + c
}

const curriedSum = curry(sum)

console.log('---------------')
console.log(curriedSum(1)(2)(3))
// console.log(curriedSum(1, 2)(3))
// console.log(curriedSum(1, 2, 3))