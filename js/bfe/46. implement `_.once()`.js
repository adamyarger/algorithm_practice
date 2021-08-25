
/**
 * 
 * @param {*} fn 
 * 
 * only calculate the value once, then return the cached value
 */
function once(func) {
  let count = 0
  let val

  return function (...args) {
    if (!count) {
      val = func.apply(this, args)
      count += 1
    }

    return val
  }
}

function func(num) {
  return num
}

const onced = once(func)

console.log(onced(13))
// 1, func called with 1

console.log(onced(2))
// 1, even 2 is passed, previous result is returned