// we use class since Promises use the constructor pattern new Promise
class Prom {
  state = 'PENDING'
  value = undefined
  thenCallbacks = []
  errorCallbacks = []

  constructor(action) {
    // bind the reject and resolve callbacks to the promise scope
    action(this.resolver.bind(this), this.reject.bind(this))
  }

  resolver(value) {
    this.state = 'RESOLVED'
    this.value = value
    this.thenCallbacks.forEach((callback) => {
      callback(this.value)
    })
  }

  reject(value) {
    this.state = 'REJECTED'
    this.value = value
    this.errorCallbacks.forEach((callback) => {
      callback(this.value)
    })
  }

  then(callback) {
    this.thenCallbacks.push(callback)
    return this // allow chaining
  }

  catch(callback) {
    this.errorCallbacks.push(callback)
    return this
  }
}


const promise = new Prom((resolve, reject) => {
  setTimeout(() => {
    const rand = Math.ceil(Math.random(1 * 1 + 6) * 6)
    if (rand % 2) {
      resolve('SUCCESS')
    } else {
      reject('ERROR')
    }
  }, 500);
})

promise.then((response) => {
  console.log(this)
  console.log(response)
}).then((res) => {
  console.log('dude')
}).catch((error) => {
  console.log(error)
})