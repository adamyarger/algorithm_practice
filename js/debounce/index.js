

/**
 * keep reimplemnting a function as lang as its being triggered
 * keep canceling the function as long as its being triggered within a wait time
 * when the wait time is over fire it once
 * @param func 
 * @param wait 
 * @param immediate 
 */
function debounce(func, wait, immediate) {
  let timeout
  let context
  let args

  return function () {
    // if were in timeout save the latest args and context
    if (timeout) {
      context = this
      args = arguments
    }

    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    // timout will keep getting set so call now cant fire until later is fire and clears it
    const callNow = immediate && !timeout
    // if a timeout exists clear it... were about to start a new one
    clearTimeout(timeout)
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args)
  }
};

/**
 * 
 * STEPS
 * 
 * 
 * limit the amount of call to 1 time per wait time
 * 
 * @param {*} fn 
 * @param {*} wait 
 */
function throttle(fn, wait) {
  let throttled = false
  let context
  let args

  function wrapper() {
    if (throttled) {
      context = this
      args = arguments
      return
    }

    fn.apply(context, args)
    throttled = true

    setTimeout(function () {
      // times up unthrottle
      throttled = false

      // args lets us know if a function was waiting
      if (args) {
        wrapper.apply(context, args)
        // fired... reset to base
        args = null
        context = null
      }
    }, wait);
  }

  return wrapper
}



const myEfficientFn = debounce(function () {
  const frag = document.createRange().createContextualFragment(`<p>debounce</p>`)
  document.querySelector('.debounce').appendChild(frag)
}, 300, true);

const throttleCb = throttle(function () {
  const frag = document.createRange().createContextualFragment(`<p>throttle</p>`)
  document.querySelector('.throttle').appendChild(frag)
}, 300)

// must use a named function, anonymous functions cant be canceled
// if we use a iife it declares a new function and fires it each time
window.addEventListener('resize', myEfficientFn);
window.addEventListener('resize', throttleCb)