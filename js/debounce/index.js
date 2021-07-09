

/**
 * how do we declare a function type with unknown params and return values?
 * creates and returns a new debounced function whic is postponed until after the milleseconds told to wait
 * @param func 
 * @param wait 
 * @param immediate 
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**
 * 
 * STEPS
 * save var on outside function scope
 * if throttled set the new callback functions arguments
 * if not reset throttled and call the callback
 * restart timeout to throttle --> recursivly call wrapper again
 * 
 * @param {*} fn 
 * @param {*} wait 
 */
function throttle(fn, wait) {
  // is there a current active throttle?
  let throttled = false

  // why do these need to be on the outside?
  let context
  let args

  function wrapper() {
    if (throttled) {
      // if were still throttling, set the new context and arguments
      // then return... its not time to fire yet
      args = arguments
      context = this

      console.log(args, context)
      return
    }

    // no longer throttled. reset it and call the function callback
    throttled = true
    fn.apply(context, arguments)

    // set up the next throttle
    setTimeout(() => {
      // when the wait is over this gets fired
      throttled = false
      if (args) {
        // why call this again? because as long as the event is being fired we 
        // need to keep checking when we can call our throttled function
        wrapper.apply(context, args)
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
}, 300);

const throttleCb = throttle(function () {
  const frag = document.createRange().createContextualFragment(`<p>throttle</p>`)
  document.querySelector('.throttle').appendChild(frag)
}, 300)

// must use a named function, anonymous functions cant be canceled
// if we use a iife it declares a new function and fires it each time
window.addEventListener('resize', myEfficientFn);
window.addEventListener('resize', throttleCb)