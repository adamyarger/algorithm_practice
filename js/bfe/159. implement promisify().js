/**
 * Let's take a look at following error-first callback.

const callback = (error, data) => {
  if (error) {
    // handle the error
  } else {
    // handle the data
  }
}
Now think about async functions that takes above error-first callback as last argument.

const func = (arg1, arg2, callback) => {
  // some async logic
  if (hasError) {
    callback(someError)
  } else {
    callback(null, someData)
  }
}
You see what needs to be done now. Please implement promisify() to make the code better.

const promisedFunc = promisify(func)

promisedFunc().then((data) => {
  // handles data
}).catch((error) => {
  // handles error
})
 */


/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 * 
 * func can have arbitrary amount of argsments before the callback
 * how do we find the callback?
 */
function promisify(func) {
  // what do we do with func?
  return function (...args) {
    return new Promise((resolve, reject) => {
      // fill in the arbitrary args then leave the callback o be handled and turned into a promise
      // this IS NOT!!! have anything to do with scope, its about what this is during the execution context
      // this matter when promisify is used inside an object that gets called in dot notation

      // were declaring the callback that gets passed to the func
      func.call(...args, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}

// this is an example its not actually used
// const callback = (error, data) => {
//   if (error) {
//     // handle the error
//   } else {
//     // handle the data
//   }
// }

const func = (arg1, arg2, callback) => {
  // some async logic
  if (hasError) {
    callback(someError)
  } else {
    callback(null, someData)
  }
}

const promisedFunc = promisify(func)

promisedFunc(1, 2).then((data) => {
  // handles data
}).catch((error) => {
  // handles error
})



// NEED to bind this
function func(arg1, arg2, arg3, callback) {
  setTimeout(() => {
    callback(null, this.foo)
  }, 50)
}

const obj = {
  foo: 'BFE',
  promisified: promisify(func)
}

obj.promisified(1, 2, 3).then((data) => {
  expect(data).toBe('BFE')
  done()
})