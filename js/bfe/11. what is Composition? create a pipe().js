/**
 * what is Composition? It is actually not that difficult to understand, see @dan_abramov 's explanation.

Here you are asked to create a pipe() function, which chains multiple functions together to create a new function.

Suppose we have some simple functions like this

const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) =>  (x) => x - y
const divide = (y) => (x) => x / y
Your pipe() would be used to generate new functions


pipe([
  times(2),
  times(3)
])
// x * 2 * 3

pipe([
  times(2),
  plus(3),
  times(4)
])
// (x * 2 + 3) * 4

pipe([
  times(2),
  subtract(3),
  divide(4)
])
// (x * 2 - 3) / 4
notes

to make things simple, functions passed to pipe() will all accept 1 argument
 */

/**
 * @param {Array<(arg: any) => any>} funcs 
 * @return {(arg: any) => any}
 */
function _pipe(funcs) {
  return function run(arg) {
    let result = arg
    for (let i = 0; i < funcs.length; i++) {
      let func = funcs[i]
      result = func(result)
    }
    return result
  }
}

function pipe(funcs) {
  return (arg) => funcs.reduce((acc, fn) => fn(acc), arg)
}


const times = (y) => (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) => (x) => x - y
const divide = (y) => (x) => x / y


const one = pipe([
  times(2),
  times(3)
])

console.log(one(2))

// x * 2 * 3