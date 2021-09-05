(function () {

  // this template will get shared across all tabs instances
  // performance boost
  // this is like template in vue
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      ::slotted(howto-panel) {
        flex-basis: 100%;
      }
    </style>
    <slot name="tab"></slot>
    <slot name="panel"></slot>
  `

  customElements.define('v-tabs', class VTabs extends HTMLElement {
    constructor() {
      super()
      // attachShdow returns this.shadowRoot
      this.attachShadow({ mode: 'open' })

      // clone the contents o the template
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // store reference to our tab and panel slots
      this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]')
      this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]')


      // slot change goes here
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    _allPanels() {
      return Array.from(this.querySelectorAll('v-panel'))
    }

    _allTabs() {
      return Array.from(this.querySelectorAll('v-tab'))
    }

    _onClick(event) {

    }
  })

  // count used for tab ids on instances
  let tabCounter = 0

  customElements.define('v-tab', class VTab extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      this.setAttribute('role', 'tab')

      if (!this.id) {
        this.id = `v-tab-gen-${tabCounter++}`
      }

      this.setAttribute('aria-selected', 'false')
      this.setAttribute('tabindex', -1)

      // why??? is it just reading the prop value?
      // this._upgradeProperty('selected')
    }

    _upgradeProperty(prop) {

    }

    attrbuteChangedCallback() {

    }

    set selected(value) {
      value = Boolean(value)
      if (value) {
        this.setAttribute('selected', '')
      } else {
        this.removeAttribute('selected')
      }
    }

    get selected() {
      return this.hasAttribute('selected')
    }
  })

  let panelCounter = 0

  customElements.define('v-panel', class VPanel extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      this.setAttribute('role', 'tabpanel')

      if (!this.id) {
        this.id = `v-panel-gen-${panelCounter}`
      }
    }
  })
})()