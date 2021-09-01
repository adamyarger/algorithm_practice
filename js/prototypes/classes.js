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

  // a()
}


function SuperType(name) {
  this.name = name
  this.forSuper = [1, 2]
  this.from = 'super'
}
SuperType.prototype.superMethod = function () { }
SuperType.prototype.method = function () { }
SuperType.staticSuper = 'staticSuper'

function SubType(name) {
  this.name = name
  this.forSub = [3, 4]
  this.from = 'sub'
}

SubType.prototype.subMethod = function () { }
SubType.prototype.method = function () { }
SubType.staticSub = 'staticSub'

const myExtends = (SuperType, SubType) => {
  function Child(...args) {
    // copy properties
    SuperType.apply(this, args)
    SubType.apply(this, args)

    // handle new prototype
    // Object.setPrototypeOf(this, SubType.prototype)
    this.__proto__ = SubType.prototype
  }

  // subtype inherits from supertype
  // Object.setPrototypeOf(SubType.prototype, SuperType.prototype)
  SubType.prototype.__proto__ = SuperType.prototype

  // child inheits from sub type
  Child.prototype.__proto__ = SubType.prototype

  // why????
  // this is for static functions, so we can fire supers static functions
  Object.setPrototypeOf(Child, SuperType)
  // Child.__proto__ = SuperType

  return Child
}

let extended = myExtends(SuperType, SubType)

var foo = new extended()

console.log(foo)

// constructor allows us to accesss static methods
// when extending a class we must call super since the super
// constructor is whats used to crate the this object
{
  class Super {
    constructor() {
      this.superName = 'dude'
    }

    speak() {
      console.log(this.superName)
    }

    static superStat() {
      console.log('super stat')
    }
  }


  class Sub extends Super {
    constructor() {
      super()
      this.subName = 'dude'
    }

    speak() {
      console.log(this.subName)
    }

    static subStat() {
      console.log('sub stat')
    }
  }

  let child = new Sub()
  console.log(child)
  // as soon as were in the constructor, we can follow its prototype chain
  // which will lead to its static functions to the chain
  child.constructor.superStat()
}