


const ce = (function (w) {
  'use strict'

  const document = w.document
  const Text = w.Text

  function context() {
    function h(...args) {
      let el = null
      // item handles everything
      // just pass in an argument and it will determine what to do based on its type
      function item(arg) {
        let r
        // handle string - either tag or text
        // element must exist first before text
        if (arg === null) {
        } else if (typeof arg === 'string') {
          r = handleString(arg)
        } else if (typeof arg === 'number') {
          // handleNumbers coerce to string
        } else if (Array.isArray(arg)) {
          // pass in array of children
        } else if (isNode(arg)) {
          // nested node
          // r = arg will set r and pass in arg in one swoop
          el.appendChild(r = arg)
        } else if (arg instanceof Text) {
          // allow passing in arbitrary text
          el.appendChild(r = arg)
        } else if (typeof arg === 'object') {
          // handle props set attributes
        } else if (typeof arg === 'function') {
          // handle onclick and stuff
        }

        // r is the node that gets tacked on
        return r
      }

      function handleString(arg) {
        if (!el) {
          el = document.createElement(arg)
        } else {
          const r = document.createTextNode(arg)
          el.appendChild(r)
          return r
        }
      }

      while (args.length) {
        item(args.shift())
      }

      // recursion must be automatic since all the function calls ahppen in the arguments
      return el
    }

    // h.cleanup ==> clean up functions

    return h
  }

  return context

  function isNode(node) {
    return node && node.nodeName && node.nodeType
  }
})(this)

const h = ce()

const el = h(
  'div',
  h('div', 'dude what',
    ' more text',
    h('h1', 'Hello World')))

console.log(el)
document.querySelector('.card').appendChild(el)