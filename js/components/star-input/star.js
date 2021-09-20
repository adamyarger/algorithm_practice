


(function main() {
  {
    function renderStars({ size, value }) {
      let html = ''
      for (let i = 0; i < size; i++) {
        const id = i + 1
        html += `
          <star-input-item 
            ${value && id <= value ? 'active' : ''}
            value="${id}">
          </star-input-item>`
      }
      return html
    }

    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host {
        }

        .star-container {
          display: flex;
        }
      </style>

      <div class="star-container"></div>
    `
    customElements.define('star-input', class StarInput extends HTMLElement {
      static formAssociated = true

      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this._internals = this.attachInternals()
        this.container = this.shadowRoot.querySelector('.star-container')
      }

      connectedCallback() {
        this.renderStars()
        this.container.addEventListener('starHoverStart', this.onMouseEnter.bind(this))
        this.container.addEventListener('starClick', this.onClick.bind(this))
        this.container.addEventListener('mouseleave', this.onMouseLeave.bind(this))
      }

      onMouseEnter(event) {
        this.highlightStars(event.target.value)
      }

      onMouseLeave(event) {
        this.renderStars()
      }

      onClick(event) {
        this.value = event.target.value
        this.renderStars()
        this.dispatchEvent(new Event('input'))
      }

      renderStars() {
        this.container.innerHTML = renderStars({
          size: this.size,
          value: this.value || 0
        })
      }

      highlightStars(value) {
        const stars = this.allStars()
        stars.forEach((item, index) => {
          item.active = index + 1 <= value ? true : false
        })
      }

      allStars() {
        return Array.from(this.shadowRoot.querySelectorAll('star-input-item'))
      }

      get value() {
        return parseInt(this.getAttribute('value'))
      }

      set value(val) {
        this.setAttribute('value', val)
      }

      get size() {
        return this.getAttribute('size') || 5
      }

      set size(val) {
        this.setAttribute(Math.round(parseInt(val)))
      }
    })
  }

  {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host {
          font-size: 24px;
        }

        .star {
          cursor: pointer;
        }

        .star--active {
          display: none;
        }

        :host([active]) .star--active {
          display: block
        }

        :host([active]) .star--empty {
          display: none
        }
      </style>

      <div class="star star--empty">☆</div>
      <div class="star star--active">★</div>
    `
    customElements.define('star-input-item', class StarInput extends HTMLElement {
      static get observedAttributes() {
        return ['active']
      }

      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }

      connectedCallback() {
        this.addEventListener('mouseenter', this.onMouseEnter.bind(this))
        this.addEventListener('click', this.onClick.bind(this))
      }

      onMouseEnter(event) {
        this.dispatchEvent(new CustomEvent('starHoverStart', {
          bubbles: true,
          detail: {
            value: this.value
          }
        }))
      }

      onClick(event) {
        this.dispatchEvent(new CustomEvent('starClick', {
          bubbles: true,
          detail: {
            value: this.value
          }
        }))
      }

      get value() {
        return parseInt(this.getAttribute('value'))
      }

      get active() {
        return this.hasAttribute('active')
      }

      set active(val) {
        const active = Boolean(val)
        if (active) {
          this.setAttribute('active', '')
        } else {
          this.removeAttribute('active')
        }
      }
    })
  }
})()