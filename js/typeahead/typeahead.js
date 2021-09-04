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
  function debounce(fn, wait) {
    let timer = null

    return function (...args) {
      // keep resetting the timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
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
      const listener = debounce(function (event) {
        console.log(event.target.value)
        // console.log(event.target)
        // this.search(event.target.value)
        //   .then(res => res.json())
        //   .then(data => console.log(data))
      }, 500)

      console.log(listener)

      const other = event => {
        console.log(event.target.value)
      }

      // debounce this
      this.input.addEventListener('keyup', listener)
    }

    search(value) {
      // create your own qs parser
      return fetch(`${this.#BASE}?name=${value}`)
    }
  }

  customElements.define('type-ahead', TypeAhead)
})()