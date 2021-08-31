/**
 * whats the difference between function constructors and classes?
 *
 * classes:
 * - strict mode by default
 * - all internal functions are non enumerable by default
 * - classes are NOT hoisted (they act like let and are in the temporal dead zone)
 * - your not allowed to call new with internal class methods
 */

class Dude {
  constructor() {
    this.name = 'adam'
  }

  speak() {
    console.log(this.name)
  }
}

const me = new Dude()

// for (const key in me) {
//   console.log(key)
// }

// name

// equivlent in es5

{
  let Person = (function () {
    'use strict'

    // const so we cant overwrite a class name
    // e.g. Person = Berson
    const Person = function (first, last) {
      // new.target can be used to detect if the new keyword was used
      if (typeof new.target === undefined) {
        throw new Error('constructor must be called with new')
      }

      this.first = first
      this.last = last
    }

    Object.defineProperty(Person.prototype, 'sayName', {
      value: function () {
        // make sure internal methods are not called with new
        if (typeof new.target !== undefined) {
          throw new Error('method cant be called with new')
        }

        console.log(this.name)
      },
      enumerable: false,
      writable: true,
      configurable: true
    })

    // getter setter
    Object.defineProperty(Person.prototype, 'fullName', {
      enumerable: false,
      get: function () {
        return `${this.first} ${this.last}`
      },
      set: function (name) {
        [this.first, this.last] = name.split(' ')
      }
    })

    return Person
  })()

  const me = new Person('adam', 'yarger')
  me.fullName = 'Jorge Young'
  console.log(me)
}

{
  function a() {
    b()

    function b() {
      console.log(dude)

      {
        let ok = 34
        {
          let good = 42
          {
            console.log(ok)
            {
              console.log(good)
            }
          }
        }
      }
    }

    var dude = 'dude'
  }

  a()
}