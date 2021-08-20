
class Prom {
  _promiseState = 'pending'
  _rejectionTasks = []
  _fulfillmentTasks = []
  _promiseResult = undefined

  // constructor(action) {
  //   console.log(action)

  //   // action is a callback function that gets passed in
  //   // the function take a resolve and reject function

  //   // why use bind???
  //   // whats the edge case???
  //   action(this.resolve.bind(this), this.reject.bind(this))
  // }

  // resolve calls the callbacks
  resolve(value) {
    // if its not in pending return this which acts like ignoring it
    if (this._promiseState !== 'pending') return this
    this._promiseState = 'fulfilled'
    this._promiseResult = value
    // invoke all fullfillment reactions
    this._clearAndEnqueueTasks(this._fulfillmentTasks)
    return this
  }

  reject(error) {
    if (this._promiseState !== 'pending') return this
    this._promiseState = 'rejected'
    this._promiseResult = error
    this._clearAndEnqueueTasks(this._rejectionTasks)
    return this
  }

  _clearAndEnqueueTasks(tasks) {
    this._fulfillmentTasks = undefined
    this._rejectionTasks = undefined
    tasks.map(queueMicrotask)
  }

  // then registers callbacks
  then(onFulfilled, onRejected) {
    // why use a wrpper function?
    // because we need promises to always be async, else well release Zalgo
    const fulfillmentTask = () => {
      if (typeof onFulfilled === 'function') {
        onFulfilled(this._promiseResult)
      }
    }

    const rejectionTask = () => {
      if (typeof onRejected === 'function') {
        onRejected(this._promiseResult)
      }
    }

    switch (this._promiseState) {
      case 'pending':
        // the state is pending so add both tasks. We dont know which one will be used yet
        this._fulfillmentTasks.push(fulfillmentTask)
        this._rejectionTasks.push(rejectionTask)
        break
      case 'fulfilled':
        // fulfilled, probably caused by Promise.resolve().then()...
        queueMicrotask(fulfillmentTask)
        break
      case 'rejected':
        // fulfilled, probably caused by Promise.reject().then()...
        queueMicrotask(rejectionTask)
        break
      default:
        throw new Error()
    }
  }
}


{
  const one = new Prom()

  function dude() {
    const rand = Math.random() > 0.5
    if (rand) {
      one.resolve(rand).then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    } else {
      one.reject('ERROR').then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    }
  }

  dude()
}

// const promise = new Prom((resolve, reject) => {
//   if (Math.random() > 0.5) {
//     resolve('fulfilled')
//   } else {
//     reject('rejected')
//   }
// })

// promise.then(response => {
//   console.log(response)
// }, err => {
//   console.log(err)
// })