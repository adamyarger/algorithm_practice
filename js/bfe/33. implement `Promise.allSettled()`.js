


/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  if (!promises.length) return Promise.resolve([])
  promises = promises.map(p => Promise.resolve(p))
  const out = []

  return new Promise((resolve, reject) => {
    promises.forEach((prom, index) => {
      prom.then(res => {
        out[index] = {
          status: 'fulfilled',
          value: res
        }
      }).catch(err => {
        out[index] = {
          status: 'rejected',
          reason: err
        }
      }).then(_ => {
        if (out.length === promises.length) {
          resolve(out)
        }
      })
    })
  })
}



var arr = [
  1,
  2,
  Promise.reject(1)
]

allSettled(arr).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})