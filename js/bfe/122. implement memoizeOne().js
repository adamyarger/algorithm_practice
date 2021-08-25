
/**
 * 
 * @param {*} func 
 * @param {*} isEqual 
 * 
 * https://github.com/alexreardon/memoize-one
 */
function _isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

function memoizeOne(func, isEqual = _isEqual) {
  let _args
  let _val
  let _this
  let _isCalled = false

  return function (...args) {
    if (_isCalled && this === _this && isEqual(_args, args)) return _val
    _args = args
    _this = this
    _val = func.apply(this, args)
    _isCalled = true
    return _val
  }
}



// function sum(...args) {
//   return args.reduce((acc, val) => acc + val, 0)
// }

// const memSum = memoizeOne(sum)

// console.log(memSum(1, 2, 4))

let callCount = 0
const func = (a, b, c) => {
  callCount += 1
  return a + b + c
}
const memoed = memoizeOne(
  func,
  (args1, args2) => Math.max(...args1) === Math.max(...args2)
)

console.log(memoed(2, 3, 4))