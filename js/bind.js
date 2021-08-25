

function hardBind(fn, context) {
  return function () {
    return fn.apply(context, arguments)
  }
}

var obj = {
  dude: 2
}

const foo = hardBind(function (key) {
  console.log(this[key])
}, obj)

foo('dude')


function MyObject(arg) {
  this.testNumber = arg
}

function MyObject2(arg) {
  this.testString = arg
}

// replace the default prototype of MyObject2
// prototype is only avaiable for assignment else its a hidden object represented as [[prototype]]
MyObject2.prototype = new MyObject(8)

// create instance of MyObj2
let objectRef = new MyObject2('string val')

/**
 * the prototype for MyObject2 will be MyObject
 *
 * objRef = {
 *  testString: 'string val'
 *  __proto__: {
 *    testNumber: 8
 *  }
 * }
 */