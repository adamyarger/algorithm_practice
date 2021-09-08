function throttle(func, wait) {
  let lastArgs = null
  let timer = null

  return function (...args) {
    if (timer) {
      lastArgs = args
      return
    }

    func.apply(this, args)
    timer = setTimeout(() => {
      if (lastArgs) {
        func.apply(this, lastArgs)
        timer = null
      }
    }, wait)
  }
}