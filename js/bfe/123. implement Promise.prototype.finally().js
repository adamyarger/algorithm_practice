/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
function myFinally(promise, onFinally) {
  return promise.then(response => {
    // still do the last .then so we dont loose the value of response
    return Promise.resolve(onFinally()).then(() => response)
  }).catch(error => {
    // resolve the promise with the finally, if we didnt the finally would never happen
    // then reject last
    return Promise.resolve(onFinally()).then(() => Promise.reject(error))
  })
}