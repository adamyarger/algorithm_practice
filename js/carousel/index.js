/**
 * Use prototype pattern the classes use behind the scenes
 * https://everyday.codes/javascript/please-stop-using-classes-in-javascript/
 *
 * - fetch imags from https://www.reddit.com/r/aww/top/.json?t=all
 * - use raw xhr
 */
'use strict'

function c(type, props = {}) {
  const el = document.createElement(type)

  for (let key in props) {
    // borrow the function in case something weird was passed in
    if (Object.prototype.hasOwnProperty.call(props, key) && props[key] !== 'text') {
      el.setAttribute(key, props[key])
    }
  }

  if ('text' in props) {
    el.textContent = props.text
  }

  return el
}

function Carousel(el) {
  this.images = []
  this.index = 0
  this.el = el

  console.log(this.el)

  this.print = function () {
    console.log('dude')
  }
}

// whats the difference between prototype function expression and adding function inside as this.func?
Carousel.prototype.setImages = function (images) {
  this.images = images

  const gallery = c('div', {
    class: 'gallery'
  })

  this.images.forEach(img => {
    gallery.appendChild(c('img', {
      src: img,
      class: 'gallery-image'
    }))
  })

  this.el.appendChild(gallery)
}


Carousel.prototype.getImages = function () {
  return this.images
}