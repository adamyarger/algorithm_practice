

(function main() {

  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      :host {
        display: flex;
        gap: var(--input-gap, 0.75rem);
      }
    </style>

    <slot></slot>
  `

  customElements.define('pin-input', class PinInput extends HTMLElement {
    static formAssociated = true

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.internals = this.attachInternals()
      this.initValue = this.getAttribute('value')
    }

    connectedCallback() {
      this.addEventListener('input', this.onInput.bind(this))
      this.addEventListener('paste', this.onPaste.bind(this))

      customElements.whenDefined('pin-input-field').then(_ => {
        this.value = this.initValue
      })
    }

    disconnectedCallback() {
      this.removeEventListener('input', this.onInput.bind(this))
      this.removeEventListener('paste', this.onPaste.bind(this))
    }

    onInput(event) {
      if (event.target.value) {
        this.focusNext(event.target)
      } else {
        this.focusBack(event.target)
      }
    }

    onPaste(event) {
      let paste = (event.clipboardData || window.clipboardData).getData('text')
      this.value = paste
    }

    focusNext(input) {
      if (input.nextElementSibling) {
        input.nextElementSibling.input.focus()
      }
    }

    focusBack(input) {
      if (input.previousElementSibling) {
        input.previousElementSibling.input.focus()
      }
    }

    getAllInputs() {
      return Array.from(this.querySelectorAll('pin-input-field'))
    }

    get isValid() {
      return this.getAllInputs().every(input => !!input.value)
    }

    // set set value
    get value() {
      return this.getAllInputs().reduce((acc, item) => acc + item.value, '')
    }

    set value(val) {
      if (!val) return
      const parts = val.split('')
      this.getAllInputs().forEach((input, index) => input.value = parts[index] || '')
    }
  })

  const fieldTemp = document.createElement('template')
  fieldTemp.innerHTML = `
    <style>
      input {
        height: var(--input-height, 38px);
        width: var(--input-width, 38px);
        text-align: center;
        font-size: var(--input-font-size, 16px);
      }
    </style>

    <input type="text">
  `

  customElements.define('pin-input-field', class PinInputField extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(fieldTemp.content.cloneNode(true))
      this.input = this.shadowRoot.querySelector('input')
    }

    connectedCallback() {
      this.input.addEventListener('input', this.onInput.bind(this))
    }

    onInput(event) {
      const value = event.target.value

      if (value.length > 1) {
        event.target.value = value.slice(0, 1)
      }

      if (!this.isNumber(value)) {
        event.preventDefault()
      }
    }

    isNumber(value) {
      return Number.isInteger(parseInt(value))
    }

    get value() {
      return this.input.value
    }

    set value(val) {
      this.input.value = val
    }
  })
})()