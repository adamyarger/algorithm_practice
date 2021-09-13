
// please complete the implementation
class EventEmitter {
  constructor() {
    this.events = {}
  }

  subscribe(eventName, callback) {
    if (!(eventName in this.events)) {
      this.events[eventName] = {}
    }

    const id = Symbol()
    this.events[eventName][id] = callback

    return {
      release: () => {
        delete this.events[eventName][id]
      }
    }
  }

  emit(eventName, ...args) {
    if (!(eventName in this.events)) return

    for (const key of Object.getOwnPropertySymbols(this.events[eventName])) {
      this.events[eventName][key](...args)
    }
  }
}

let ev = new EventEmitter()
let rep = ev.subscribe('dude', (arg) => console.log(arg))
let rep2 = ev.subscribe('dude', (arg) => console.log(arg + '333'))


ev.emit('dude', 'bro')
console.log(ev.events)

console.log(rep.release)