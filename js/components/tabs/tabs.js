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
        flex-direction: column;
      }

      ::slotted(v-panel) {
        flex-basis: 100%;
      }
    </style>
    
    <div class="tabs-container">
      <slot name="tab"></slot>
    </div>

    <div class="panels-container">
      <slot name="panel"></slot>
    </div>
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


      // listen for slot changes
      // needs to update linkage when it happens
      // only fires when the nodes change, not the attributes
      this._tabSlot.addEventListener('slotchange', this._onSlotChange.bind(this))
      this._panelSlot.addEventListener('slotchange', this._onSlotChange.bind(this))
    }

    connectedCallback() {
      this.addEventListener('click', this._onClick)

      // use microqueue to wait till child components have been registed with custom components
      Promise.all([
        customElements.whenDefined('v-tab'),
        customElements.whenDefined('v-panel')
      ]).then(_ => this._linkPanels())
    }

    disconnectedCallback() {
      this.removeEventListener('click', this._onClick)
    }

    _onSlotChange() {
      this._linkPanels()
    }

    // link the panels and tab together
    // use aria for caue and effect relationship
    _linkPanels() {
      const tabs = this._allTabs()

      // add the aria labels
      tabs.forEach(tab => {
        // somewhat tightly coupled: panel and tab must 
        // be next to eachother in the correct order
        const panel = tab.nextElementSibling

        if (panel.tagName.toLowerCase() !== 'v-panel') {
          console.error(`Tab #${tab.id} should be a sibling of panel`)
          return
        }

        tab.setAttribute('aria-controls', panel.id)
        panel.setAttribute('aria-labelledby', tab.id)
      })

      // grab the selected tab or grab the first one
      const selectedTab = tabs.find(tab => tab.selected) || tabs[0]

      // forces resetting tabs so only one is selected
      this._selectTab(selectedTab)
    }

    reset() {
      const tabs = this._allTabs()
      const panels = this._allPanels()

      // reset their attrubtes
      tabs.forEach(tab => tab.selected = false)
      panels.forEach(panel => panel.hidden = true)
    }

    _selectTab(newTab) {
      this.reset()
      // we have the tab, but we need the panel as well to display
      const newPanel = this._panelForTab(newTab)

      if (!newPanel) {
        throw new Error(`No panel for tab id ${newTab.id}`)
      }

      newTab.selected = true
      newPanel.hidden = false
      newTab.focus()
    }

    _allPanels() {
      return Array.from(this.querySelectorAll('v-panel'))
    }

    _allTabs() {
      return Array.from(this.querySelectorAll('v-tab'))
    }

    _panelForTab(tab) {
      const panelId = tab.getAttribute('aria-controls')
      return this.querySelector(`#${panelId}`)
    }

    _onClick(event) {
      if (event.target.getAttribute('role') !== 'tab') return
      this._selectTab(event.target)
    }
  })

  // count used for tab ids on instances
  let tabCounter = 0

  customElements.define('v-tab', class VTab extends HTMLElement {


    // register which attributes you want to watch for changes in
    static get observedAttributes() {
      return ['selected']
    }

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
      this._upgradeProperty('selected')
    }

    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        let value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }

    // callback for attribute changes, only ones you declared above
    // we want to keep attributes in sync with properties
    attributeChangedCallback() {
      const value = this.hasAttribute('selected')

      // when a selected change happens we want to update the aria labels
      this.setAttribute('aria-selected', value)
      this.setAttribute('tabindex', value ? 0 : -1)
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
        this.id = `v-panel-gen-${panelCounter++}`
      }
    }
  })
})()