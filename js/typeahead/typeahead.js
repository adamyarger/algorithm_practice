/**
 * - caching?
 * - cancel fetch requests when new one is made
 * - debounce typing and search
 * - highlight word found so far
 * - use cursor to navigate options
 * - enter should select
 * - create a recent cache (LRU)
 */

class TypeAhead extends HTMLElement {
  #BASE = 'http://universities.hipolabs.com/search?name=montana'

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    // open means we can acess the shadow dom from the outside
    const shadow = this.attachShadow({ mode: 'open' });

    // add elements like normal
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'typeahead')

    wrapper.textContent = 'HELLO'


    // attach
    shadow.appendChild(wrapper)
  }

}

customElements.define('type-ahead', TypeAhead)