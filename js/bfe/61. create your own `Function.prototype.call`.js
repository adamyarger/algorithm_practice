

Function.prototype.mycall = function (thisArg, ...args) {
  // when not in strict mode a null or undefined thisArgs will get the window value
  thisArg = thisArg || window

  // make sure its an object. turn primitive into object
  thisArg = Object(thisArg)

  // we ned a unique property. WHY???
  let func = Symbol()

  // WHY???
  thisArg[func] = this

  let res = thisArg[func](...args)

  delete thisArg[func]

  return res
}


const obj = {
  name: 'Adam',
  speak() {
    console.log(this.name)
  }
}

const obj2 = {
  name: 'DAVE'
}

obj.speak.call(obj2)

obj.speak.mycall(obj2)