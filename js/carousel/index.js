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
}

Carousel.prototype.calcTransform = function () {
  return this.index * this.slideWidth
}

Carousel.prototype.addGallery = function () {
  const controls = textToEl(`
    <div class="left">
      <div class="arrow-left"></div>
    </div>
    
    <div class="dots"></div>

    <div class="right">
      <div class="arrow-right"></div>
    </div>
  `)
  this.el.appendChild(controls)

  const gallery = c('div', {
    class: 'gallery'
  })

  this.imageNodes = this.images.map((img, index) => {
    const dotClass = index === this.index ? 'dot active' : 'dot'
    const dot = c('div', { class: dotClass, id: `dot-${index}` })
    this.el.querySelector('.dots').appendChild(dot)

    const el = c('div', {
      class: 'img-contain',
      style: `width: ${this.slideWidth}px;`
    })
    el.appendChild(c('img', {
      src: img,
      class: 'gallery-image',
    }))
    gallery.appendChild(el)
    return el
  })

  this.el.appendChild(gallery)
}

Carousel.prototype.setImages = function (images) {
  this.images = images
  this.slideWidth = this.el.offsetWidth
  this.addGallery()
  this.setEvents()
  this.cycle(3000)
}

Carousel.prototype.addDotClickEvent = function () {
  this.el.querySelector('.dots').addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('dot')) {
      const index = Number(event.target.getAttribute('id').split('dot-')[1])
      this.setActive(this.index, index)
    }
  })
}

Carousel.prototype.setIndex = function (prev, index) {
  this.updateActiveDot(prev, index)
}

Carousel.prototype.setEvents = function () {
  document.querySelector('.right').addEventListener('mouseup', () => {
    this.next()
    this.cycle(3000)
  })

  document.querySelector('.left').addEventListener('mouseup', () => {
    this.prev()
    this.cycle(3000)
  })

  this.addDotClickEvent()
}

Carousel.prototype.updateActiveDot = function (prev, index) {
  if (index === this.images.length) {
    this.el.querySelector(`#dot-${0}`).classList.add('active')
  } else {
    this.el.querySelector(`#dot-${index}`).classList.add('active')
  }

  this.el.querySelector(`#dot-${prev}`).classList.remove('active')
}

Carousel.prototype.setActive = function (prev, index) {
  this.imageNodes[prev]

  this.updateActiveDot(prev, index)
  this.index = index

  if (index === this.images.length) {
    this.index = 0
  }

  const calc = this.calcTransform()
  const val = calc === 0 ? 0 : -calc
  this.el.querySelector('.gallery').style.transform = `translateX(${val}px)`
}

Carousel.prototype.next = function () {
  this.setActive(this.index, this.index + 1)
}

Carousel.prototype.prev = function () {
  this.setActive(this.index, this.index - 1)
}

Carousel.prototype.cycle = function (wait) {
  clearInterval(this.intervalId)
  this.intervalId = setInterval(() => {
    this.next()
  }, wait);
}

Carousel.prototype.getImages = function () {
  return this.images
}