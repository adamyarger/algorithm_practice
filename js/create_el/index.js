
function c(type, props) {
  let el = document.createElement(type)

  for (const key in props) {
    if (key !== 'text') {
      el.setAttribute(key, props[key])
    }
  }

  // is there a better way to create testnodes? What are the edge cases?
  if ('text' in props) {
    el.textContent = props.text
  }

  return el
}

/**
 * Allow tree structures, should be able to nest children
 * 
 * EXTRA
 * extract styles so their not inlined
 */
let div = c('div', {
  class: 'red',
  style: 'color: red; font-weight: bold;',
  'data-id': 1,
  text: 'YELLOW!!'
})

document.querySelector('.container').appendChild(div)

