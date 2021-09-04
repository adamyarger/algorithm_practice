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

    return function (...args) {
      // keep resetting the timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, wait);
    }
  }

  function request(req, opts) {
    // create your own qs parser
    const controller = new AbortController()
    const signal = controller.signal

    return {
      abort: () => controller.abort(),
      ready: fetch(req, { ...opts, signal })
    }
  }

  class TypeAhead extends HTMLElement {
    #BASE = 'http://universities.hipolabs.com/search'

    // can we observe value on an input?
    static get observedAttributes() {

    }

    static createDropdown() {
      const dropdown = document.createElement('div')
      dropdown.setAttribute('class', 'dropdown')
      return dropdown
    }

    static createDropdownItem(obj, index) {
      const item = document.createElement('div')
      item.setAttribute('class', 'dropdown-item')
      item.setAttribute('data-id', index)
      item.textContent = obj.name
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
      this.value = null

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

      // debounce needs to memoize timers, so it should be initiallzed once on mounted
      const search = this.searchDebounce()
      this.input.addEventListener('keyup', event => {
        search(event, event.target)
      })

      // do event capture of child
      // need id for which child
      this.dropdown.addEventListener('mouseup', this.selectItem.bind(this))
    }

    searchDebounce() {
      let current
      // debounce this
      // need to cache target since event object gets reused for each new dom event
      return debounce((event, target) => {
        if (!target.value) {
          this.dropdown.innerHTML = ''
          return
        }

        if (current) {
          current.abort()
        }

        current = this.search(target.value);

        current.ready
          .then(res => res.json())
          .then(data => {
            this.items = data
            this.renderItems(this.items)
            current = null
          }).catch(error => {
            if (error.name === 'AbortError') {
              console.log('aborted')
            } else {
              throw new Error(error)
            }
          });
      }, 50)
    }

    search(value) {
      return request(`${this.#BASE}?name=${value}`)
    }

    // it would be nice to observe state change then update
    renderItems(items) {
      this.dropdown.innerHTML = ''
      this.dropdown.style.display = ''
      items.forEach((item, index) => {
        this.dropdown.appendChild(TypeAhead.createDropdownItem(item, index))
      })
    }

    selectItem(event) {
      /**
       * onselect set the value to the name
       * hide the dropdown
       * emit an event
       * test that event works by listening on html page
       * displat selected object below after
       * 
       * this === element from event
       */

      this.value = parseInt(event.target.getAttribute('data-id'))

      // fill in text
      this.input.value = this.selected.name

      // close dropdown
      this.dropdown.style.display = 'none'

      // emit event
      const select = new Event('select')
      this.dispatchEvent(select)
    }

    get selected() {
      if (!this.value) return null
      return this.items[this.value]
    }

    highlightItem() {
      /**
       * highlight the match sequence so far
       */
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
  }

  customElements.define('type-ahead', TypeAhead)
})()