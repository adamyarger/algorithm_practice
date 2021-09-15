
(function () {
  {
    const template = document.createElement('template')
    template.innerHTML = `
    <style>
      ::slotted(pin-input-field) {
        margin-left: 8px;
      }

      :host {
        display: flex;
      }
    </style>

    <slot></slot>
  `
    customElements.define('pin-input', class PinInput extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.cur = null
      }

      connectedCallback() {
        this.addEventListener('input', this.onInput.bind(this))
      }

      disconnectedCallback() {
        this.removeEventListener('input', this.onInput.bind(this))
      }

      onInput(event) {
        if (event.target.value) {
          this.focusNext(event.target)
        } else {
          this.focusBack(event.target)
        }
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

      allInputs() {
        return Array.from(this.querySelectorAll('pin-input-field'))
      }

      isValid() {
        return this.allInputs.every(input => !!input.value)
      }

      get value() {
        return this.allInputs().reduce((acc, input) => acc + input.value, '')
      }
    })
  }

  {
    const PATTERN = '^[0-9]{0,1}$'
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .input {
          border-radius: 3px;
          width: 38px;
          height: 38px;
          text-align: center;
          font-size: 16px;
        }
      </style>

      <input type="text" class="input">
    `
    customElements.define('pin-input-field', class PinInputField extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.input = this.shadowRoot.querySelector('input')
        this.parent = this.shadowRoot.getRootNode().host.parentNode
      }

      connectedCallback() {
        this.input.addEventListener('input', this.onInput.bind(this))
      }

      onInput(event) {
        if (!this.isValid(event.target.value)) {
          event.target.value = event.target.value.slice(0, 1)
        } else if (event.target.value.length === 1) {
          new Event('input', {
            bubbles: true,
            details: {
              value: event.target.value
            }
          })
        }
      }

      isValid(value) {
        const reg = new RegExp(PATTERN)
        return reg.test(value)
      }

      static get observedAttributes() {
        return ['value']
      }

      get value() {
        return this.input.value
      }

      set value(val) {
        this.input.value = val
      }
    })
  }
})()