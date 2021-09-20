
/**
 * @param {HTMLElement} 
 * @return {object} object literal presentation
 */
function virtualize(element) {
  const out = {
    type: element.localName,
    props: {
      children: element.childNodes.length ? [] : null
    }
  }

  // console.log(element.childNodes)

  for (const node of element.childNodes) {
    if (Array.isArray(out.props.children)) {
      out.props.children.push(virtualize(node))
    } else {
      out.props.children = node.textContent
    }
  }

  return out
}


/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement} 
 */
function render(obj) {
  // your code here
}

(function main() {
  const root = document.querySelector('#root')
  console.log(virtualize(root))
})()
