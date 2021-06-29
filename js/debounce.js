

/**
 * how do we declare a function type with unknown params and return values?
 * creates and returns a new debounced function whic is postponed until after the milleseconds told to wait
 * @param func 
 * @param wait 
 * @param immediate 
 */
function debounce(func, wait, immediate) {
  /**
   * why does debounce work? what does the stack look like when you click a dounced function a bunch of times?
   */
  let timeout
  return function () {
    // stash the conteaxt
    let context = this
    // arguments allows us to get the passed in callback functions arguments as an array
    let args = arguments

    // create the function that will be called after the wait
    let later = function () {
      // when called reset the timeout
      timeout = null
      // if not immediate, call after the wait. This is good for things 
      // like waiting until the user is done resizing the browser window
      // apply expects an array of arguments, which we saved above, and a context
      // this will invoke the function
      if (!immediate) func.apply(context, args)
    }

    // should we call it now: boolean
    let callNow = immediate && !timeout
    // make sure the timeout is cleared before setting it
    clearTimeout(timeout)
    // set the timeout with the later function we created, and the wait time
    timeout = setTimeout(later, wait)
    // it immediate and no more wait time, call it now
    // this is good for things like prevnenting double clicks on submiting a form
    // where we want the action to be triggered right away and not a second time
    if (callNow) func.apply(context, args)
  }
}

for (let i = 0; i < 5; i++) {
  const deplayCount = debounce((i) => {
    console.log(i)
  }, 300)

  deplayCount(i)
}

// const delayed = new Promise((resolve) => {
//   debounce(() => {
//     console.log('foo')
//   }, 1000)
// })