

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