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

  const MAX_IMAGE = 76


  function Scroller(scroller, props = {}) {
    this.scroller = document.querySelector(scroller)
    this.scrollerHeight = 0
    this.sentinal = null
    this.target = null
    this.observer = null
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
    this.scroller.appendChild(this.sentinal)

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // const id = entry.target.getAttribute('data-id')
        // if (entry.isIntersecting) {
        //   console.log(`item ${id} is visible`, entry.target)
        // }

        if (entry.target === this.sentinal && entry.isIntersecting) {
          console.log('found sentinal')
          // make request
          this.items.push(this.createItems(this.fetch(5), this.observer))
        }
      }
    })

    this.items = this.createItems(this.fetch(5), this.observer)

    this.observer.observe(this.sentinal)

    this.resize()
  }

  // should be done from the outside
  Scroller.prototype.createItems = function (arr, observer) {
    return arr.map((item, index) => {
      const frag = document.createRange().createContextualFragment(item)
      const el = this.target.appendChild(frag)

      // do we need to observe images???
      // observer.observe(this.scroller.querySelector(`[data-id="${index}"]`))
      return el
    })
  }

  // what if we based every thing off item in view instead of heights?

  // first what in view






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