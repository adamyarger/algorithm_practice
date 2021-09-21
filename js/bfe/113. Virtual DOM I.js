
/**
 * @param {HTMLElement} 
 * @return {object} object literal presentation
 * 
 * text node as child
 * camelCase Properties
 * children: string or array
 * 
 * types
 * Node
 */
function toEl(element) {
  return {
    type: element.localName,
    props: {
      // extra attrs here
      children: []
    }
  }
}

function toText(attr) {

}

function virtualize(element) {
  const props = {}

  console.log(element)
  // return

  if (element.attributes) {
    for (let attr of element.attributes) {
      // should be to camel case for all
      const name = attr.name === 'class' ? 'className' : attr.name
      props[name] = attr.value
    }
  }

  const children = []

  for (let node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      children.push(node.textContent)
    } else {
      children.push(virtualize(node))
    }
  }

  props.children = children.length === 1 ? children[0] : children

  return {
    type: element.localName,
    props,
  }
}


/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement} 
 */
function render(obj) {
  if (typeof obj === 'string') {
    return document.createTextNode(obj)
  }
  const { type, props: { children, ...attrs } } = obj
  const node = document.createElement(type)

  for (const [attr, val] of Object.entries(attrs)) {
    node[attr] = val
  }

  const childrenArr = Array.isArray(children) ? children : [children]
  for (const child of childrenArr) {
    node.append(render(child))
  }
  return node
}

(function main() {
  const root = document.querySelector('#root')
  const virtual = virtualize(root)

  console.log(virtual)
  console.log(render(virtual))
})()
