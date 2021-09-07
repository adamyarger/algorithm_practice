


/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  if (!promises.length) return Promise.resolve([])

  /**
   * Promise.resolve return the same promise if the value is a promise
   * else is will wrap the value in a promise and return.
   * aka, turn all args into promises.
   */
  promises = promises.map(item => Promise.resolve(item))

  return new Promise((resolve, reject) => {
    const args = []
    promises.forEach(item => {
      item.then(res => {
        args.push(res)
      }, err => {
        reject(err)
      }).then(_ => {
        // were done once we have enough args
        // do this in a chained then since we dont know when this will be fired
        // for the last time
        if (args.length === promises.length) {
          resolve(args)
        }
      })
    })
  })
}

// wrap primitive in promiese with promise.resolve
all([]).then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
})

let one = new Promise(res => {
  setTimeout(() => {
    res('butter')
  }, 100);
})

let two = Promise.resolve(3)
let three = Promise.resolve('dude')

// all([one, two, three]).then(response => {
//   console.log(response)
// }).catch(error => {
//   console.log(error)
// })