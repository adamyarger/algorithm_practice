/**
 * return new promise in then
 * the return value from a then should be fed in as the next promises argument
 */
class Prom {
  state = 'pending'
  result = undefined
  rejectedtasks = []
  fulfilledTasks = []

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
    // whats this do??? why double microtasks???
    tasks.map(queueMicrotask)
  }

  then(onFulfill, onReject) {
    const resultPromise = new Prom()

    // add reject and fulfill microtasks
    // on fulFill and onRject act more like events

    // forward fulfillments if you skip a reject
    const fulfillTask = () => {
      if (typeof onFulfill === 'function') {
        const returned = onFulFill(this.result)
        resultPromise(returned)
      } else {
        // resolve the new promise. why??? is this how forwarding works?
        resultPromise.resolve(this.result)
      }
    }

    const rejectTask = () => {
      if (typeof reject === 'function') {
        const returned = onReject(this.result)
        resultPromise.resolve(returned)
      } else {
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


const promise = new Prom()

Prom.resolve(42)
  .then('dude')
  .then('nice')
  .catch(err => {
    console.log(err)
  })