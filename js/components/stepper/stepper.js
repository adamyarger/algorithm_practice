


(function () {
  const template = document.createElement('template')
  template.innerHTML = `
    <div class="stepper">
      <slot></slot>
    </div>
  `

  customElements.define('v-stepper', class VStepper extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {

    }

    allSteps() {
      return Array.from(this.querySelectorAll('v-stepper-item'))
    }

    // track active step

    // need reset and set attribute on change

    next() {
      const cur = this.active
      const next = cur.nextElementSibling
      this.reset()

      if (next) {
        next.setAttribute('active', '')
      }
    }

    back() {
      const cur = this.active
      const prev = cur.previousElementSibling
      this.reset()

      if (prev) {
        prev.setAttribute('active', '')
      }
    }

    reset() {
      this.allSteps().forEach(item => {
        item.active = false
      })
    }

    get active() {
      return this.allSteps().find(item => item.hasAttribute('active'))
    }

    get isLast() {
      const steps = this.allSteps()
      return steps[steps.length - 1] === this.active
    }

    get isFirst() {
      const steps = this.allSteps()
      return steps[0] === this.active
    }
  })





  const templateItem = document.createElement('template')
  templateItem.innerHTML = `
    <style>
      :host(.active) {
        display: block;
      }

      :host {
        display: none;
      }
    </style>
    
    <div class="stepper-item">
      <slot></slot>
    </div>
  `

  customElements.define('v-stepper-item', class VStepperItem extends HTMLElement {
    static get observedAttributes() {
      return ['active']
    }

    constructor() {
      super()

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(templateItem.content.cloneNode(true))
    }

    attributeChangedCallback(name, old, val) {
      // console.log(name, old, val)

      if (name === 'active') {
        if (this.active) {
          this.classList.add('active')
        } else {
          this.classList.remove('active')
        }
      }
    }

    get active() {
      return this.hasAttribute('active')
    }

    set active(val) {
      this.removeAttribute('active')
    }
  })
})()