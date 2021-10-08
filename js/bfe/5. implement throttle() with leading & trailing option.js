
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 */
function throttle(func, wait, option = { leading: true, trailing: true }) {
  let id
  let context
  let _args

  return function (...args) {


    if (id) {
      context = this
      _args = args
      return
    }

    if (option.leading !== false) {
      func.call(this, ...args)
    } else {
      context = this
      _args = args
    }

    const time = () => {
      if (option.trailing !== false && context) {
        func.call(context, ..._args)
        context = null
        _args = null
        // why recursive call?
        // try again, if there no context it wont run
        id = setTimeout(time, wait)
      } else {
        id = null
      }
    }

    id = setTimeout(time, wait)
  }
}