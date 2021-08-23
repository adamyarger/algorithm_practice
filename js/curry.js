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

// it doesnt matter if its called ...args, it only matters that its the last argumnt and its using a spread operator
function curry(fn) {
  // use ...args since we dont know how many args will be passed in
  // arguments sets activation object in the execution context
  return function curried(...args) {
    // fn.length return snumber of params expected
    if (args.length >= fn.length) {
      // this is the base case, were always going to end by calling it as a function with arguments as array
      // the purpose of the other if is to keep adding arguments to the array
      // this is still global. were just using it to fire a function with arguments as an array
      return fn.apply(this, args)
    } else {
      // use spread operator since its could be foo(1,2)
      return function (...args2) {
        // keep adding args to the args array until we have enough to fire the function like normal
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}


function sum(a, b, c) {
  return a + b + c
}

const curriedSum = curry(sum)

console.log('---------------')
console.log(curriedSum(1)(2)(3))
// console.log(curriedSum(1, 2)(3))
// console.log(curriedSum(1, 2, 3))