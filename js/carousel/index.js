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

  // add left and right buttons
  // const left = c('div')

  const gallery = c('div', {
    class: 'gallery'
  })

  this.images.forEach(img => {
    const el = c('div', {
      class: 'img-contain',
      style: `width: ${this.el.offsetWidth}px`
    })
    el.appendChild(c('img', {
      src: img,
      class: 'gallery-image'
    }))
    gallery.appendChild(el)
  })

  this.el.appendChild(gallery)



  console.log(galleryWidth)

  // get container width
  // center image and fill height

  // make sure each photo has a container that fills the gallery size

  // use translateX to slide over to the next img

  // if full width dont display images to save on rendering performance
}


Carousel.prototype.getImages = function () {
  return this.images
}