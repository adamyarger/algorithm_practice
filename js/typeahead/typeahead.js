/**
 * - caching?
 * - cancel fetch requests when new one is made
 * - debounce typing and search
 * - highlight word found so far
 * - use cursor to navigate options
 * - enter should select
 * - create a recent cache (LRU)
 */

(function () {
  /**
   * 
   * @param {*} fn 
   * @param {*} wait 
   * @returns 
   * 
   * the event object gets reused across the dom since its single threaded
   * we need to pass in a seocn darg to cache the target
   * how do synthetic dom events work?
   */
  function debounce(fn, wait) {
    let timer = null
    let _args

    return function (...args) {
      if (timer) {
        _args = args
      }

      // keep resetting the timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(..._args)
      }, wait);
    }
  }

  class TypeAhead extends HTMLElement {
    #BASE = 'http://universities.hipolabs.com/search'

    constructor() {
      // Always call super first in constructor
      super();

      // Create a shadow root
      // open means we can acess the shadow dom from the outside
      const shadow = this.attachShadow({ mode: 'open' });

      // add elements like normal
      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'typeahead')

      this.input = document.createElement('input')
      this.input.setAttribute('class', 'form-control')
      wrapper.appendChild(this.input)

      const dropdown = document.createElement('div')
      dropdown.setAttribute('class', 'dropdown')
      wrapper.appendChild(dropdown)


      // attach
      shadow.appendChild(wrapper)
    }

    // need lifecycle hooks
    connectedCallback() {
      console.log('connected')

      // wrong event being passed. WHY?
      const listener = debounce((event, target) => {
        console.log(target.value)
        this.search(target.value)
          .then(res => res.json())
          .then(data => console.log(data))
      }, 500)

      console.log(listener)

      const other = event => {
        console.log(event.target.value)
      }

      // debounce this
      // need to cache target since event object gets reused for each new dom event
      this.input.addEventListener('keyup', event => {
        listener(event, event.target)
      })
    }

    search(value) {
      // create your own qs parser
      return fetch(`${this.#BASE}?name=${value}`)
    }
  }

  customElements.define('type-ahead', TypeAhead)
})()