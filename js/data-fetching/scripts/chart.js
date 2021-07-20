/**
 *
 * How would i design this with components?
 *
 * can I get to a similar place with pure JS?
 *
 * if it were component i would...
 *
 * create 1 reuasble bar graph component
 * create 1 data aware component to fecth data and pass in props
 */

function c(type, props = {}, text) {
  // make it recursive
  const el = document.createElement(type)

  for (key in props) {
    if (Object.prototype.hasOwnProperty.call(props[key])) {
      el.setAttribute(key, props[key])
    }
  }

  if (text) {
    el.textContext = text
  }
}



