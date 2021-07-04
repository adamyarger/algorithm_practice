/**
 * use DFS to return the first matching element
 * returns Element
 * add the function to the document prototype i.e. document.qs(...)
 * 
 * https://stackoverflow.com/questions/13433799/why-doesnt-nodelist-have-foreach
 */

function qs(root, selector) {
  let target = null

  const traverse = (el) => {
    const children = el.children

    for (let i = 0; i < children.length; i++) {
      const node = children[i]

      if (node.classList.contains(selector)) {
        target = node
        return
      } else {
        traverse(node)
      }
    }
  }

  traverse(root)
  return target
}

if (!HTMLElement.prototype.qs) {
  HTMLElement.prototype.qs = function (selector) {
    return qs(this, selector)
  }
}

if (!HTMLDocument.prototype.qs) {
  HTMLDocument.prototype.qs = function (selector) {
    return qs(this, selector)
  }
}

// what is document a prototype of?
// const found = qs(document.firstElementChild, 'hi')
const found = document.qs('hi')
console.log(found)