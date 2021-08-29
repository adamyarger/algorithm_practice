


/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 * 
 * test to see if the prototype property of a constructor appears in the prototype chain
 */
function myInstanceOf(obj, target) {
  // make sure obj is an object
  if (obj === null || typeof obj !== 'object') return false

  // throw an error is target is not a function
  if (typeof target !== 'function') throw new Error('right side must be function')

  // recursivly check protos
  function checkProto(arg) {
    // no proto then its null and we didnt find it
    if (arg.__proto__) {
      // check if instance proto is the same as function proto
      if (arg.__proto__ === target.prototype) return true

      // dig deeper
      return checkProto(args.__proto__)
    }
    return false
  }

  return checkProto(obj)
}