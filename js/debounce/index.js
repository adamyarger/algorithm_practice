

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

const myEfficientFn = debounce(function () {
  const frag = document.createRange().createContextualFragment(`<p>Fire</p>`)
  document.querySelector('.container').appendChild(frag)
}, 300);

// must use a named function, anonymous functions cant be canceled
// if we use a iife it declares a new function and fires it each time
window.addEventListener('resize', myEfficientFn);