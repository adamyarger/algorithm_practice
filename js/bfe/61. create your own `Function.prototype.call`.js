

Function.prototype.mycall = function (thisArg, ...args) {
  // when not in strict mode a null or undefined thisArgs will get the window value
  thisArg = thisArg || window

  // make sure its an object. turn primitive into object
  thisArg = Object(thisArg)

  // we ned a unique property. WHY???
  // this is just used as a unique name
  let func = Symbol()

  // thisArg is an object, we create a unique attribute on it and assign this
  // set an uniquely named attribute to the speak function (this === speak)
  thisArg[func] = this

  // what is this? in a prototype so this is the function before .mycall
  // remember this is always the value before .functionName
  console.log('thisArg', this)

  // speak has been temporarli added to the obj2 object so this will rfer to obj2
  // this is whats meant by borrowing the object context
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