

(function () {
  function isObject(obj) {
    return typeof obj !== null && typeof obj === 'object'
  }

  customElements.define('x-element', class XElement extends HTMLElement {
    constructor() {
      super()
    }

    setState(newState) {
      Object.entries(newState).forEach(([key, value]) => {
        this.state[key] = isObject(this.state[key]) && isObject(value)
          ? { ...this.state[key], ...value }
          : value
      })
    }
  })
})()