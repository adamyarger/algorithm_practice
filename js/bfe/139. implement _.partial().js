
/**
 * @param {Function} func
 * @param {any[]} args
 * @returns {Function}
 */
const _ = Symbol()
partial.placeholder = _

function partial(func, ...args) {
  return function (...args2) {
    return func.apply(this, [
      ...args.map(a => a === partial.placeholder ? args2.shift() : a),
      ...args2
    ])
  }
}