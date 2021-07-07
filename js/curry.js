/**
 * why use this?
 * whats the difference between partial application?
 * https://johnresig.com/blog/partial-functions-in-javascript/
 * 
 * @param {*} fn 
 * @returns 
 */
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      console.log(this)
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}

const curriedSum = curry(sum)

console.log(curriedSum(1)(2)(3))