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

    static get observedAttributes() {

    }

    static createDropdown() {
      const dropdown = document.createElement('div')
      dropdown.setAttribute('class', 'dropdown')
      return dropdown
    }

    static createDropdownItem(value = '') {
      const item = document.createElement('div')
      item.setAttribute('class', 'dropdown-item')
      item.textContent = value
      return item
    }

    static createStyles() {
      const styles = `
        .typeahead {
          width: 100%
        }

        .form-control {
          width: 100%;
          padding: 6px 12px;
        }

        .dropdown {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, 
                      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
          width: 100%;
          border-radius: 4px;
          background: #fff;
          max-height: 300px;
          overflow: auto;
        }

        .dropdown-item {
          padding: 6px 12px;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: #EDF2F7;
        }
      `
      const el = document.createElement('style')
      el.innerHTML = styles
      return el
    }

    constructor() {
      // Always call super first in constructor
      super();
      this.items = []

      // Create a shadow root
      // open means we can acess the shadow dom from the outside
      const shadow = this.attachShadow({ mode: 'open' });

      // add elements like normal
      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'typeahead')

      this.input = document.createElement('input')
      this.input.setAttribute('class', 'form-control')
      wrapper.appendChild(this.input)

      this.dropdown = TypeAhead.createDropdown()
      wrapper.appendChild(this.dropdown)


      // attach
      shadow.appendChild(TypeAhead.createStyles())
      shadow.appendChild(wrapper)
    }

    // need lifecycle hooks
    connectedCallback() {
      console.log('connected')

      // wrong event being passed. WHY?
      const listener = debounce((event, target) => {
        if (!target.value) {
          this.dropdown.innerHTML = ''
          return
        }

        this.search(target.value)
          .then(res => res.json())
          .then(data => {
            this.items = data
            this.renderItems(this.items)
          })
      }, 500)

      // debounce this
      // need to cache target since event object gets reused for each new dom event
      this.input.addEventListener('keyup', event => {
        listener(event, event.target)
      })
    }

    // it would be nice to observe state change then update
    renderItems(items) {
      this.dropdown.innerHTML = ''
      items.forEach(item => {
        this.dropdown.appendChild(TypeAhead.createDropdownItem(item.name))
      })
    }

    disconnectedCallback() {
      console.log('el disconnected')
    }

    adoptedCallback() {
      console.log('el adopted')
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('el updated')
    }

    search(value) {
      // create your own qs parser
      return fetch(`${this.#BASE}?name=${value}`)
    }
  }

  customElements.define('type-ahead', TypeAhead)
})()