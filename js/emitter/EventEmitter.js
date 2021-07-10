/**
 * sub callbacks under a name can be many
 * when an emit gets called loop through and fire each callback under that name
 * 
 * how do we release? probably delete from
 * 
 * 
 * facebooks: https://github.com/facebookarchive/emitter/blob/master/src/EventSubscriptionVendor.js
 * 
 * why is theres so robust?
 */
function Emitter() {
  let subscribers = {}

  // could create hash as key to look up
  this.subscribe = function (name, fn) {
    if (!(name in subscribers)) {
      subscribers[name] = [fn]
    } else {
      subscribers[name].push(fn)
    }
  }

  // ... args is the same as arguments
  this.emit = function (name, ...args) {
    if (!(name in subscribers)) {
      throw new Error(`Event ${name} not found`)
    }

    subscribers[name].forEach(fn => {
      fn(...args)
    })
  }

  this.release = function (name, fn) {
    if (!(name in subscribers)) {
      throw new Error(`Event ${name} not found`)
    }

    subscribers[name] = subscribers[name].filter(_fn => {
      return _fn !== fn
    })

    if (!subscribers[name].length) {
      delete subscribers[name]
    }
  }
}

window.addEventListener('load', () => {
  const emitter = new Emitter()

  const dude = function (dude) {
    console.log('select it', dude)
  }

  emitter.subscribe('onSelect', dude)

  emitter.subscribe('onSelect', () => {
    console.log(this)
  })

  document.querySelector('.emit').addEventListener('mouseup', () => {
    emitter.emit('onSelect', 'dude')
  })

  document.querySelector('.stop').addEventListener('mouseup', () => {
    emitter.release('onSelect', dude)
  })
})