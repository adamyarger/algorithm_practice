

(function main() {

  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      :host {
        
      }

      .container {
        display: flex;
        justify-content: space-between;
        max-width: 340px;
      }

      input {
        padding: 6px 12px;
        width: 50px;
      }
    </style>

    <div class="container">
      <slot></slot>
    </div>
  `

  customElements.define('pin-input', class PinInput extends HTMLElement {
    static get observedAttributes() {
      return ['value']
    }

    constructor() {
      super()

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      // add events
      this._allInputs().forEach(input => {
        input.onInput = (value, el) => {
          // calculate value here

          // focus next
          if (value) {
            if (el.nextElementSibling) {
              el.nextElementSibling.input.focus()
            }
          } else {
            if (el.previousElementSibling) {
              el.previousElementSibling.input.focus()
            }
          }
        }
      })

      customElements.whenDefined('pin-input-field').then(res => {
        this._fillInputs()
      })
    }

    _fillInputs() {
      if (!this.value) return

      const inputs = this._allInputs()

      this.value.split('').forEach((num, index) => {
        inputs[index].value = num
      })
    }

    _allInputs() {
      return Array.from(this.querySelectorAll('pin-input-field'))
    }

    disconnectedCallback() {

    }

    get value() {
      return this.getAttribute('value')
    }

    set value(val) {
      this.setAttribute('value', val)
    }
  })

  function createInput(attrs = {}) {
    const input = document.createElement('input')
    for (const key in attrs) {
      input.setAttribute(key, attrs[key])
    }
    return input
  }

  // used for ids
  let fieldsCount = 0

  customElements.define('pin-input-field', class PinInputField extends HTMLElement {
    static get observedAttributes() {
      return ['value']
    }

    constructor() {
      super()

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(createInput({ id: `pin-field-${fieldsCount}` }))
      fieldsCount += 1

      this.input = this.shadowRoot.querySelector('input')
    }

    connectedCallback() {
      this.parent = this.shadowRoot.getRootNode().host.parentNode
      if (this.parent.localName !== 'pin-input') {
        throw new Error('pin-input-field parent must be pin-input')
      }

      this.input.addEventListener('input', this._onInput.bind(this))
    }

    disconnectedCallback() {
      this.input.removeEventListener('input', this._onInput.bind(this))
    }

    _onInput(event) {
      this.value = event.target.value
      this.onInput(this.value, this)
    }

    attributeChangedCallback(name, old, val) {
      if (name === 'value') {
        this.input.value = val
      }
    }

    get value() {
      return this.getAttribute('value')
    }

    set value(val) {
      this.setAttribute('value', val)
    }
  })
})()