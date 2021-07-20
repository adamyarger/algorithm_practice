(function (global) {
  function c(...args) {
    console.log(args)

    /**
     * first arg is always the type
     * second or 3rd can be either text or props obj
     * 
     * allow nesting
     */

    const type = args[0]
    let text
    let props = {}
    let children = []

    for (let i = 1; i < args.length; i++) {
      const val = args[i]
      if (typeof val === 'string') {
        text = val
      } else if (val instanceof HTMLElement) {
        children.push(val)
      } else if (typeof val === 'object') {
        props = val
      }
    }

    const el = document.createElement(type)

    if (props) {
      for (key in props) {
        if (Object.prototype.hasOwnProperty.call(props[key])) {
          el.setAttribute(key, props[key])
        }
      }
    }

    if (text) {
      el.textContext = text
    }

    el.children = children

    return el
  }

  const comp = c(
    'div', { class: 'chart' },
    c('div'),
    c('div',
      c('div', { class: 'inner' })))

  console.log(comp)
})(this)


/**
 *
 * IDEAS:
 * implement module pattern
 * have index.js import and declare depndencies
 */