/**
 * - obserables are push base while iterators are pull based
 *
 * when you call next in an iterator it pulls the data from the iterator
 * when you call next from an observer it pushes the data to the observable
 * - then the observable subscriber will handle that like an event
 *
 * essentially an observer is the opposite of an iterator
 * iterator = producer = passive ... consumer = active
 * observer = producer = active ... consumer = passive
 */

/**
 * wrapper class to track state and trigger observer methods accordingly
 * - next, error and complete act as proxy methods
 */
class Subscriber {
  constructor(observer) {
    if (typeof observer === 'function') {
      this.observer = {
        next: observer
      }
    } else {
      this.observer = observer
    }
    this.closed = false
  }

  next(value) {
    if (this.closed) return
    if (this.observer.next) {
      try {
        this.observer.next(value)
      } catch (err) {
        this.error(err)
      }
    }
  }

  error(err) {
    if (this.closed) return
    if (this.observer.error) {
      this.observer.error(err)
    }
    this.unsubscribe()
  }

  complete() {
    if (this.closed) return
    if (this.observer.complete) {
      this.observer.complete()
    }
    this.unsubscribe()
  }

  unsubscribe() {
    this.closed = true
  }
}

class Observable {
  #setup

  constructor(setup) {
    this.#setup = setup
  }

  subscribe(observer) {
    const subscriber = new Subscriber(observer)
    this.#setup(subscriber)
    return {
      unsubscribe() {
        subscriber.unsubscribe()
      }
    }
  }
}

// this will be passed as the subscriber
// subscriber === oberver
const observer = {
  next: (value) => {
    console.log('value: ', value)
  },
  error: (error) => {
    console.log('we got an error', error)
  },
  complete: () => {
    console.log('ok, no more values')
  }
}

// do next error and complete just act like callbacks? kind of like prototype?

const observable = new Observable((subscriber) => {
  subscriber.next(1)
  subscriber.next(2)
  setTimeout(() => {
    subscriber.next(3)
    subscriber.complete()
    console.log('--- complete ---')
    subscriber.next('wtf mate') // should not fire
  }, 500);
})

observable.subscribe(observer)