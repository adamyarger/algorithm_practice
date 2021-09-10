/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 * 
 * .finally should not interfer with the promise chain
 */
function myFinally(promise, onFinally) {
  return promise.then(response => {
    // still do the last .then so we dont loose the value of response
    return Promise.resolve(onFinally()).then(() => response)
  }).catch(error => {
    // resolve finally, then keep the promise chain alive, bubble up reject
    return Promise.resolve(onFinally()).then(() => Promise.reject(error))
  })
}



const promise = Promise.resolve('dude')

promise.then(res => {
  throw new Error('dddddd')
  // return 'dude'
}).catch(err => {

  return err
}).finally(() => {
  console.log('finally')
}).then(res => {
  // gets fed to last .then value
  console.log('after', res)
})