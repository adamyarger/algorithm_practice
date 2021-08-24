/**
 * This problem is similar to 11. what is Composition? create a pipe().

You are asked to implement an async function helper, sequence() which chains up async functions, like what pipe() does.

All async functions have following interface

type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void
Your sequence() should accept AsyncFunc array, and chain them up by passing new data to the next AsyncFunc through data in Callback.

Suppose we have an async func which just multiple a number by 2

const asyncTimes2 = (callback, num) => {
   setTimeout(() => callback(null, num * 2), 100)
}
Your sequence() should be able to accomplish this

const asyncTimes4 = sequence(
  [
    asyncTimes2,
    asyncTimes2
  ]
)

asyncTimes4((error, data) => {
   console.log(data) // 4
}, 1)
Once an error occurs, it should trigger the last callback without triggering the uncalled functions.

Follow up

Can you solve it with and without Promise?
 */


/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs) {
  // wrap each function in a promise
  const promiseFns = funcs.map(promisify)

  return function (cb, input) {
    // wrap the data in a promise. why???
    let promise = Promise.resolve(input)

    // we can chain promises now that their wrapped and the initial input is also a promise
    promiseFns.forEach(fn => {
      // what happens when the value is a promise in .then? we resolve it. aka flatten it
      promise = promise.then(fn)
    })

    promise.then(data => {
      cb(undefined, data)
    }).catch(cb)
  }
}

// take in one of the piped async functions
function promisify(cb) {
  return function (input) {
    return new Promise((resolve, reject) => {
      // cb is async, it has setTimeout so the resolve and reject need to happen inside
      cb((err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      }, input)
    })
  }
}



const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100)
}

// returns a function
const asyncTimes4 = sequence(
  [
    asyncTimes2,
    asyncTimes2
  ]
)

asyncTimes4((error, data) => {
  console.log(data) // 4
}, 1)