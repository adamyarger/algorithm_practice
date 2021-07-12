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
  this.imageNodes = []
  this.index = 0
  this.el = el
  this.leftActive = false
  this.rightActive = false
  this.slideWidth = 0
  this.intervalId = null

  this.calcTransform = function () {
    return this.index * this.slideWidth
  }
}

// should this be private?
Carousel.prototype.addGallery = function () {
  const left = textToEl(`
    <div class="left">
      <div class="arrow-left"></div>
    </div>
  `)
  this.el.appendChild(left)

  const right = textToEl(`
    <div class="right">
      <div class="arrow-right"></div>
    </div>
  `)
  this.el.appendChild(right)

  const gallery = c('div', {
    class: 'gallery'
  })

  // in rality we dont need all these ndoes, we only need a buffer
  this.imageNodes = this.images.map((img, index) => {
    const display = index === this.index ? 'initial' : 'none'
    const el = c('div', {
      class: 'img-contain',
      style: `width: ${this.slideWidth}px;`
    })
    el.appendChild(c('img', {
      src: img,
      class: 'gallery-image',
      style: `display: ${display};`
    }))
    gallery.appendChild(el)
    return el
  })

  this.el.appendChild(gallery)
}

// can we use a contructor? was that dded when classes were?

// whats the difference between prototype function expression and adding function inside as this.func?
Carousel.prototype.setImages = function (images) {
  this.images = images
  this.slideWidth = this.el.offsetWidth

  this.addGallery()
  this.setEvents()
  this.cycle(3000)
}

Carousel.prototype.setEvents = function () {
  // ite janky... should hide images not in view. show only next and prev and current
  // need to keep track of nodes
  // register click events for left and right
  // add transition via animate frame request
  document.querySelector('.right').addEventListener('mouseup', () => {
    this.next()
    this.cycle(3000)
  })

  document.querySelector('.left').addEventListener('mouseup', () => {
    this.prev()
    this.cycle(3000)
  })
}

// reset timer on events
Carousel.prototype.next = function () {
  this.index++

  if (this.index === this.images.length) {
    this.index = 0
  }


  this.imageNodes[this.index].querySelector('.gallery-image').style.display = 'initial'
  if (this.index) {
    this.imageNodes[this.index - 1].querySelector('.gallery-image').style.display = 'initial'
  }
  this.el.querySelector('.gallery').style.transform = `translateX(-${this.calcTransform()}px)`
}

Carousel.prototype.prev = function () {
  this.index--
  // this.imageNodes[this.index].querySelector('.gallery-image').style.display = 'none'
  const calc = this.calcTransform()
  const val = calc === 0 ? 0 : -calc
  this.el.querySelector('.gallery').style.transform = `translateX(${val}px)`
}

Carousel.prototype.cycle = function (wait) {

  clearInterval(this.intervalId)
  console.log('cycle')

  // cycle through every x amount of time
  // needs to be named to cancel

  // why dos setINterval set this to window???

  // what happens when we hit the end of images.. should delete or go to beginning
  this.intervalId = setInterval(() => {
    // this.next()
  }, wait);
}

Carousel.prototype.getImages = function () {
  return this.images
}