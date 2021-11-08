/**
 * 
 * - track child components
 * - emit actions up for the parent to handle
 */
(function () {
  const starTemp = document.createElement('template')
  starTemp.innerHTML = `
    <style>
      .star-input {
        display: flex;
      }
    </style>

    <div class="star-input"></div>
  `
  customElements.define('star-input', class StarInput extends HTMLElement {
    static formAssociated = true

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(starTemp.content.cloneNode(true))
      this._internals = this.attachInternals()
      this.container = this.shadowRoot.querySelector('.star-input')
    }

    connectedCallback() {
      this.render()
      this.container.addEventListener('starClick', this.onClick.bind(this))
      this.container.addEventListener('starMouseEnter', this.onMouseEnter.bind(this))
      this.container.addEventListener('mouseleave', this.onMouseLeave.bind(this))
    }

    onMouseEnter(event) {
      this.highlightStars(event.target.value)
    }

    onMouseLeave() {
      this.render()
    }

    onClick(event) {
      this.value = event.target.value
      this.render()
      this.dispatchEvent(new Event('input'))
    }

    template() {
      let out = ''
      let value = this.value || 0

      for (let i = 0; i < this.size; i++) {
        const id = i + 1
        out += `
          <star-input-item
            ${id <= value ? 'active' : ''}
            value=${id}>
          </star-input-item>
        `
      }

      return out
    }

    render() {
      this.container.innerHTML = this.template()
    }

    highlightStars(value) {
      const stars = this.getAllStars()
      stars.forEach((item, index) => {
        item.active = index + 1 <= value
      })
    }

    getAllStars() {
      return Array.from(this.shadowRoot.querySelectorAll('star-input-item'))
    }

    get value() {
      return parseInt(this.getAttribute('value'))
    }

    set value(val) {
      this.setAttribute('value', val)
    }

    get size() {
      return parseInt(this.getAttribute('size')) || 5
    }

    set size(val) {
      this.setAttribute('size', val)
    }
  })



  const itemTemp = document.createElement('template')
  itemTemp.innerHTML = `
    <style>
      :host {
        font-size: var(--star-font-size, 24px);
      }

      .star {
        cursor: pointer;
      }

      .star--active {
        display: none;
      }

      :host([active]) .star--active {
        display: block;
      }

      :host([active]) .star--empty {
        display: none;
      }
    </style>
    
    <div class="star star--empty">☆</div>
    <div class="star star--active">★</div>
  `

  customElements.define('star-input-item', class StarInputItem extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(itemTemp.content.cloneNode(true))
    }

    connectedCallback() {
      this.addEventListener('click', this.onClick.bind(this))
      this.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    }

    onClick(event) {
      this.dispatchEvent(new CustomEvent('starClick', {
        bubbles: true,
        detail: {
          value: this.value
        }
      }))
    }

    onMouseEnter(event) {
      this.dispatchEvent(new CustomEvent('starMouseEnter', {
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
      const isActive = Boolean(val)
      if (isActive) {
        this.setAttribute('active', '')
      } else {
        this.removeAttribute('active')
      }
    }
  })

})()