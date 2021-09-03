/**
 * - caching?
 * - cancel fetch requests when new one is made
 * - debounce typing and search
 * - highlight word found so far
 * - use cursor to navigate options
 * - enter should select
 * - create a recent cache (LRU)
 */

class Typeahead extends HTMLDivElement {
  #BASE = 'http://universities.hipolabs.com/search?name=montana'

  constructor() {
    super()
  }
}