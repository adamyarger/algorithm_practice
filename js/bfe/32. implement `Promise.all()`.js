


/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // make sur evertything is a promise
  promises = promises.map(item => {
    return Promise.resolve(item)
  })

  return new Promise((resolve, reject) => {
    let args = []
    promises.forEach(item => {
      item.then(res => {
        args.push(res)
      }, err => {
        reject(err)
      }).then(res => {
        if (args.length === promises.length) {
          resolve(args)
        }
      })
    })
    if (!promises.length) resolve(args)
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