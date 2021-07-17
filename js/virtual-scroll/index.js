/**
 *  could turn this int a headles virtual scroll react package that can be used for gallerys or tables
 *
 * sentinal element (how does google do it?)
 *
 * buffer for top and bottom
 * page height so we know how many photots to load
 * 
 * Page function adding and removing whole pages
 *
 * on Resize
 *
 * onscroll
 *
 *keep a shadow root for creating new elements that will get mounte next
 *
 */


const Scroller = (function (global) {
  'use strict'

  // keep private stuff out here
  const SCROLL_RUNWAY = 2000

  const RUNWAY_ITEMS = 5

  const MAX_ITEMS = 50


  function Scroller(scroller, props = {}) {
    this.scroller = document.querySelector(scroller)
    this.scrollerHeight = 0
    this.sentinal = null
    this.target = null
    this.observer = null
    this.items = []
    this.fetch = () => { }

    this.init(props)
  }

  Scroller.prototype.resize = function () {
    this.scrollerHeight = this.scroller.offsetHeight

    this.scroller.style.overflow = 'auto'
    this.scroller.style.height = `calc(100vh - 100px)`
    // get scroller div and save it
    // calculate height
  }

  // IEDA: put sentinal part way throguh the content to make request
  Scroller.prototype.init = function (props) {
    this.fetch = props.fetch
    this.target = this.scroller.querySelector(props.target)

    this.sentinal = c('div', { class: 'sentinal', style: 'height: 1px; width: 1px;' })

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.sentinal && entry.isIntersecting) {
          this.items = [...this.items, ...this.createItems(this.fetch(), this.observer)]

          if (this.items.length > MAX_ITEMS) {
            console.log(this.items.length, 'OVER')
            this.recycle(20)
          }
        }
      }
    })

    this.items = this.createItems(this.fetch(), this.observer)

    this.observer.observe(this.sentinal)

    this.resize()
  }

  Scroller.prototype.updateSentinal = function () {
    if (this.scroller.querySelector('.sentinal')) {
      this.sentinal = this.target.removeChild(this.sentinal)
    }
    this.target.appendChild(this.sentinal)
  }

  // should be done from the outside
  Scroller.prototype.createItems = function (arr, observer) {
    return arr.map((item, index) => {
      const frag = document.createRange().createContextualFragment(item)
      let el = this.target.appendChild(frag)
      el = this.target.lastElementChild

      if (arr.length - index === RUNWAY_ITEMS) {
        this.updateSentinal()
      }

      return el
    })
  }


  // get rid of items after certain threshold
  // should we cache some? then garbage collect for goo after?
  Scroller.prototype.recycle = function (size) {
    // TODO: add nodes back in on way up
    for (let i = 0; i < size; i++) {
      this.target.removeChild(this.items[0])
      this.items.shift()
      // should be just cache the nodes we take off?
    }
  }

  // How does intersection observer change on window resize?




  function c(type, props = {}, text) {
    const el = document.createElement(type)

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        el.setAttribute(key, props[key])
      }
    }

    if (text) {
      el.textContent = text
    }

    return el
  }

  return Scroller
})(window)