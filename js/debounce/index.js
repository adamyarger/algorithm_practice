

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
 * init vars outside the function that will be returned
 * return function
 * if throttled set args and contex then return
 * 
 * set throttled
 * apply fn
 * 
 * settimeout
 * throttle false
 * 
 * 
 * @param {*} fn 
 * @param {*} wait 
 */
function throttle(fn, wait) {
  let throttled = false
  let args
  let context

  function wrapper() {
    if (throttled) {
      args = arguments
      context = this
      return
    }

    throttled = true
    fn.apply(context, arguments)

    setTimeout(() => {
      throttled = false
      if (args) {
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