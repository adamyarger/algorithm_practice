/**
 * @param {Function} constructor
 * @param {any[]} args - argument passed to the constructor
 * `myNew(constructor, ...args)` should return the same as `new constructor(...args)`
 */
var myNew = (constructor, ...args) => {
  if (typeof constructor !== 'function') return

  // create a new object and set its prototype to the constructors prototype
  const obj = Object.create(constructor.prototype)

  // how does this.name = name work then?
  // were passing in obj which will now be this
  // so when this.name = is called it references the obj and creates and assign a new property
  let response = constructor.apply(obj, args)

  // only return an object, if its a primitive return the object we cerated
  return typeof response === 'object' && response !== null
    ? response
    : obj
}

function Foo(name) {
  this.name = name
}

var foo = myNew(Foo, 'Adam')
console.log(foo)


function BigFrontEndOther(name) {
  this.name = name

  this.fn = () => console.log(this)

  this.fn2 = function () {
    console.log(this)
  }

  // return this implicityly happens
  // were chainging it here. does this.name get completely ignored now?
  // return {
  //   a: 1
  // }
}

const obj = myNew(BigFrontEndOther, 'dev')
// console.log(obj)
obj.fn()
obj.fn2()

console.log('-----')
// expect(obj).toEqual({ a: 1 })

const obj2 = new BigFrontEndOther('dev')
// console.log(obj2)