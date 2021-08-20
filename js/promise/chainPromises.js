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

  resolve(value) {
    // ignore if not pending
    if (this.state !== 'pending') return this
    // set state and result, result needs to be passed to next promise ans arg
    this.state = 'fulfilled'
    this.result = value
    this.clearAndEnqueueTasks(this.fulfilledTasks)
    return this
  }

  reject(error) {
    if (this.state !== 'pending') return this
    this.state = 'rejected'
    this.result = error
    this.clearAndEnqueueTasks(this.rejectedtasks)
    return this
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
        const returned = onFulfill(this.result)
        resultPromise.resolve(returned)
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
        const returned = onReject(this.result)
        resultPromise.resolve(returned)
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

  catch(onRejected) {
    // nide helper method, reuse functionality in .then
    return this.then(null, onRejected)
  }

}

function isThenable(value) {
  return typeof value === 'object'
    && value !== null
    && typeof value.then === 'function'
}


const promise = new Prom()

/**
 * resolve returns the promises itself the promise with a fulfilled state and the result set
 * - .then hold both fulfilled and rejected callbacks
 */

promise.reject('ERROR')
  .then(res => {
    console.log(res)
    return 'dude'
  })
  .then(res => console.log(res, 'DUDE'))
  .catch(err => {
    console.log(err)
    return 'dude'
  }).then(res => {
    console.log(res)
  })

promise.reject()