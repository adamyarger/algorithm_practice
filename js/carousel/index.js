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

function textToEl(text) {
  return document.createRange().createContextualFragment(text)
}

function Carousel(el) {
  this.images = []
  this.index = 0
  this.el = el
  this.leftActive = false
  this.rightActive = false

  this.print = function () {
    console.log('dude')
  }
}

// whats the difference between prototype function expression and adding function inside as this.func?
Carousel.prototype.setImages = function (images) {
  this.images = images

  // add left and right buttons
  const left = textToEl(`
    <div class="left">
      prev
    </div>
  `)
  this.el.appendChild(left)

  const right = textToEl(`
    <div class="right">
      next
    </div>
  `)
  this.el.appendChild(right)

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



  // register click events for left and right
  // add transition via animate frame request
  setTimeout(() => {
    document.querySelector('.right').addEventListener('mouseup', () => {
      // keep track of index and calculate px
      this.el.querySelector('.gallery').style.transform = `translateX(-720px)`
    })

    document.querySelector('.left').addEventListener('mouseup', () => {
      this.el.querySelector('.gallery').style.transform = `translateX(0px)`
    })
  });
}

Carousel.prototype.getImages = function () {
  return this.images
}