/**
 * https://github.com/rauschma/toy-promise/blob/master/toy-promise4_exceptions.js
 * return new promise in then
 * the return value from a then should be fed in as the next promises argument
 * 
 * flattening
 * - allow returning a promise in .then whicb will be used as the next new promise that gets returned
 *   instead of creating a new promise internally
 */
class Prom {
  state = 'pending'
  result = undefined
  rejectedtasks = []
  fulfilledTasks = []
  alreadyResolved = false

  constructor(action) {
    if (typeof action !== 'function') return

    // state will be pending
    // we pass the executor function the internal resolve and reject functions which can mutate the promises state
    // this is a closure
    action(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(value) {
    if (this.alreadyResolved) return this
    this.alreadyResolved = true

    //check if resolved with a promise
    if (isThenable(value)) {
      // whats this do??? pass it forward
      // since were not returning the promise thats passed in we need to adopt its state
      // why so we need to adopt its state?
      // we adopt the state so we can flatten the promise, make sure the promise is settled.
      value.then(
        result => this.doFulfill(result),
        error => this.doReject(error)
      )
    } else {
      // do it the old way if value is NOT a promise or thenable
      this.doFulfill(value)
    }

    return this
  }

  doFulfill(value) {
    this.state = 'fulfilled'
    this.result = value
    this.clearAndEnqueueTasks(this.fulfilledTasks)
  }

  reject(error) {
    if (this.alreadyResolved) return this
    this.alreadyResolved = true
    this.doReject(error)
    return this
  }

  doReject(error) {
    this.state = 'rejected'
    this.result = error
    this.clearAndEnqueueTasks(this.rejectedtasks)
  }

  clearAndEnqueueTasks(tasks) {
    this.rejectedtasks = undefined
    this.fulfilledTasks = undefined
    // each task is passed to microqueue
    tasks.map(queueMicrotask)
  }

  then(onFulfill, onReject) {
    const resultPromise = new Prom()

    // add reject and fulfill microtasks
    // on fulFill and onRject act more like events

    // forward fulfillments if you skip a reject
    const fulfillTask = () => {
      if (typeof onFulfill === 'function') {
        this.runReactionSafely(resultPromise, onFulfill)
      } else {
        // resolve the new promise. why??? is this how forwarding works?
        resultPromise.resolve(this.result)
      }
    }

    // if we pass no error callback to then
    // we need to forward it to the next one
    // this way catch can handle multiple errors
    const rejectTask = () => {
      if (typeof onReject === 'function') {
        this.runReactionSafely(resultPromise, onReject)
      } else {
        // if nothing is their to handle then bubble it down
        // set the new promise to a rejected state
        resultPromise.reject(this.result)
      }
    }

    switch (this.state) {
      case 'pending':
        // queue both tasks we dont know which one wins
        this.fulfilledTasks.push(fulfillTask)
        this.rejectedtasks.push(rejectTask)
        break;
      case 'fulfilled':
        // fulfill right away with a microtasks, no need to add to queue
        queueMicrotask(fulfillTask)
        break
      case 'rejected':
        queueMicrotask(rejectTask)
        break
      default:
        throw new Error()
    }

    // return fresh new promise, returning the current promise doesnt 
    // work since its fulfilled and its state is immutable
    return resultPromise
  }

  runReactionSafely(resultPromise, reaction) {
    try {
      const returned = reaction(this.result)
      resultPromise.resolve(returned)
    } catch (error) {
      resultPromise.reject(error)
    }
  }

  catch(onRejected) {
    // nide helper method, reuse functionality in .then
    return this.then(null, onRejected)
  }

  static resolve(val) {
    if (val instanceof Prom) {
      return val
    }

    return new Promise(resolve => resolve(val))
  }

}

function isThenable(value) {
  return typeof value === 'object'
    && value !== null
    && typeof value.then === 'function'
}


const promise = new Prom((resolve, reject) => {
  setTimeout(() => {
    return promise.resolve('foo done')
  }, 100);
})
const prom1 = new Prom()

console.log(Prom.resolve(promise) === promise)

function foo() {
  setTimeout(() => {
    return promise.resolve('foo done')
  }, 100);
}

function bar() {
  return prom1.resolve('bar done')
}

promise.then(res => {
  console.log(res)
  throw new Error('dude')
  return bar()
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log('hello error')
})



// promise.resolve(prom1.resolve()).then(res => {
//   console.log(res, 'fire')
// }).catch(err => {
//   console.log(err)
// })

/**
 * resolve returns the promises itself the promise with a fulfilled state and the result set
 * - .then hold both fulfilled and rejected callbacks
 */

// promise.reject('ERROR')
//   .then(res => {
//     console.log(res)
//     return 'dude'
//   })
//   .then(res => console.log(res, 'DUDE'))
//   .catch(err => {
//     console.log(err)
//     return 'dude'
//   }).then(res => {
//     console.log(res)
//   })

