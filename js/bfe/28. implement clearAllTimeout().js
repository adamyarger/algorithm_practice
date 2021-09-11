

const { setTimeout: _setTimeout, clearTimeout: _clearTimeout } = window

window.timerIds = new Set()

window.setTimeout = function (fn, time, ...args) {
  let timerId
  let callback = () => {
    // arbitratry args gets passed fro the setTimeout to the callback function
    fn.apply(args)
    // delete the timer after its been fired
    window.timerIds.delete(timerId)
  }

  timerId = _setTimeout(callback, time)
  window.timerIds.add(timerId)
  return timerId
}

window.clearTimeout = function (timerId) {
  window.timerIds.delete(timerId)
  _clearTimeout(timerId)
}

function clearAllTimeout() {
  for (const timer of window.timerIds) {
    _clearTimeout(timer)
  }
}


