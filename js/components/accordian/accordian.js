

(function main() {
  {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>

      </style>

      <div class="accordian">
        <slot></slot>
      </div>
    `
    customElements.define('x-accordian', class XAccordian extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }

      connectedCallback() {
        this.addEventListener('click', this.onItemClick.bind(this))

        customElements.whenDefined('x-accordian-item').then(res => {
          this.initActive()
        })
      }

      onItemClick(event) {
        const target = event.target
        if (target.tagName === 'X-ACCORDIAN-ITEM') {
          this.setActiveItem(target)
        }
      }

      setActiveItem(item) {
        this.resetActive()
        item.active = true
      }

      initActive() {
        const active = this.getActive()
        this.resetActive()
        if (active) {
          active.active = true
        } else {
          this.firstItem().active = true
        }
      }

      resetActive() {
        this.allItems().forEach(item => {
          item.active = false
        })
      }

      getActive() {
        return this.querySelector('x-accordian-item[active]')
      }

      allItems() {
        return Array.from(this.querySelectorAll('x-accordian-item'))
      }

      firstItem() {
        return this.querySelector('x-accordian-item')
      }
    })
  }

  {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .accordian-item {
          cursor: pointer;
        }

        .accordian-panel {
          border-left: 1px solid #d6d6d6;
          border-right: 1px solid #d6d6d6;
          padding: 1rem;
          display: none;
        }

        :host([active]) .accordian-panel {
          display: block;
        }

        .accordian-title {
          margin: 0;
        }

        .accordian-btn {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          padding: 1rem 1.25rem;
          cursor: pointer;
          border: 1px solid #d6d6d6;
        }
      </style>

      <div class="accordian-item">
        <h3 class="accordian-title">
          <button class="accordian-btn" type="button"></button>
        </h3>
        <div class="accordian-panel">
          <slot></slot>
        </div>
      </div>
    `

    let count = 0

    customElements.define('x-accordian-item', class XAccordianItem extends HTMLElement {
      static get observedAttributes() {
        return ['title', 'active']
      }

      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }

      connectedCallback() {
        this.id = count += 1
        this.setPanelId()
        this.setAriaControls()
        this.setButtonId()
        this.setAriaLabel()
      }

      setPanelId() {
        this.getPanelEl().id = `panel-${this.id}`
      }

      setButtonId() {
        this.getButtonEl().id = `button-${this.id}`
      }

      setTitle() {
        this.getButtonEl().innerHTML = this.title
      }

      attributeChangedCallback(name, old, val) {
        if (name === 'title') {
          this.setTitle()
        } else if (name === 'active') {
          this.setAriaExpanded()
        }
      }

      setAriaExpanded() {
        if (this.active) {
          this.getButtonEl().setAttribute('aria-expanded', true)
        } else {
          this.getButtonEl().setAttribute('aria-expanded', false)
        }
      }

      setAriaControls() {
        this.getButtonEl().setAttribute('aria-controls', this.getPanelEl().id)
      }

      setAriaLabel() {
        this.getPanelEl().setAttribute('aria-labelledby', this.getButtonEl().id)
      }

      getButtonEl() {
        return this.shadowRoot.querySelector('.accordian-btn')
      }

      getPanelEl() {
        return this.shadowRoot.querySelector('.accordian-panel')
      }

      get title() {
        return this.getAttribute('title')
      }

      get active() {
        return this.hasAttribute('active')
      }

      set active(value) {
        const isActive = Boolean(value)
        if (isActive) {
          this.setAttribute('active', '')
        } else {
          this.removeAttribute('active')
        }
      }
    })
  }

})()