/**
 * use case
 *   const playChess = curriedChallenge(_, _, 'chess');
      playChess('John', 'Sam');
      playChess('Mark', 'Mary');

      dont know the first 2 args yet, so you add plceholders
 */

function icurry(fn) {
  return function curried(...args) {
    // dont call the memoized function if the arguments includes a placeholder since its not a valid value
    if (args.length >= fn.length && !args.includes(curry.placeholder)) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        // need to skip the placeholder but still move to the next level
        // using the 2 spead operators is like using concat and apply
        // we need to fill in the placeholder if one exists, so we take the first argument from args2 and replace the placeholder
        return curried(
          ...args.map(a => a === curry.placeholder ? args2.shift() : a),
          ...args2
        )
      }
    }
  }
}

function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length && !args.includes(curry.placeholder)
      ? fn(...args)
      : (...args2) => curried(
        ...args.map(a => a === curry.placeholder ? args2.shift() : a),
        ...args2
      )
  }
}

curry.placeholder = Symbol('_')

const _ = curry.placeholder

function sum(a, b, c) {
  return `${a}_${b}_${c}`
}

const curriedSum = curry(sum)

console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1, _, 2)(3))