
(function () {
  {
    const template = document.createElement('template')
    template.innerHTML = `
    <style>
      :host {
        display: flex;
        gap: 0 8px;
      }

      ::slotted(pin-input-field) {

      }
    </style>

    <slot></slot>
  `
    customElements.define('pin-input', class PinInput extends HTMLElement {
      static formAssociated = true
      static get observedAttributes() {
        return ['value']
      }

      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this._internals = this.attachInternals()
      }

      connectedCallback() {
        this.addEventListener('input', this.onInput.bind(this))
        this.addEventListener('paste', this.onPaste.bind(this))
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

      allInputs() {
        return Array.from(this.querySelectorAll('pin-input-field'))
      }

      get isValid() {
        return this.allInputs().every(input => !!input.value)
      }

      get value() {
        return this.allInputs().reduce((acc, input) => acc + input.value, '')
      }

      set value(val) {
        const parts = val.split('')
        this.allInputs().forEach((input, index) => input.value = parts[index] || '')
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
          width: var(--pin-input-height, 38px);
          height: var(--pin-input-height, 38px);
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
          new CustomEvent('input', {
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