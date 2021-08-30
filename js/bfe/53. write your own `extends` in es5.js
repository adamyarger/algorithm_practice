/**
 * I believe you've used extends keyword in you JavaScript programs before.

Could you implement a myExtends() function in ES5 to mimic the behavior of extends?

myExtends() takes a SubType and SuperType, and return a new type.


const InheritedSubType = myExtends(SuperType, SubType)

const instance = new InheritedSubType()

// above should work (almost) the same as follows

class SubType extends SuperType {}
const instance = new SubType()
To solve this problem, you need to fully understand what is Inheritance

note

Your code will be test against following SuperType and SubType


function SuperType(name) {
    this.name = name
    this.forSuper = [1, 2]
    this.from = 'super'
}
SuperType.prototype.superMethod = function() {}
SuperType.prototype.method = function() {}
SuperType.staticSuper = 'staticSuper'

function SubType(name) {
    this.name = name
    this.forSub = [3, 4]
    this.from = 'sub'
}

SubType.prototype.subMethod = function() {}
SubType.prototype.method = function() {}
SubType.staticSub = 'staticSub'

https://bigfrontend.dev/problem/write-your-own-extends-in-es5/discuss
 */

const myExtends = (SuperType, SubType) => {
  function Child(...args) {
    /**
     * this = {}
     * 
     * grab both Supertype and sub type and add there atriutes
     * this.name = name
     * etc
     * 
     * this is meant for copying over attrbutes
     */
    SuperType.apply(this, args)
    SubType.apply(this, args)

    // now set the prototype (this) is the returned object from new
    // set the prototype of the new object created with new
    Object.setPrototypeOf(this, SubType.prototype)
  }

  // set the subtypes prototype to supertypes prototype
  Object.setPrototypeOf(SubType.prototype, SuperType.prototype)
  // set Child functions prototype to Super type
  Object.setPrototypeOf(Child, SuperType)

  return Child
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


// OUTCOME

// Child { name: undefined, forSuper: Array(2), from: "sub", forSub: Array(2) }
//   forSub: (2)[3, 4]
//   forSuper: (2)[1, 2]
//   from: "sub"
//   name: undefined
//   [[Prototype]]: SuperType
//     method: ƒ()
//     subMethod: ƒ()
//     constructor: ƒ SubType(name)
//     [[Prototype]]: Object
//       method: ƒ()
//       superMethod: ƒ()
//       constructor: ƒ SuperType(name)
