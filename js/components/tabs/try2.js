(function () {
  const template = document.createElement('template')
  template.innerHTML = `
    <style> 
      :host {
        display: block;
      }

      ::slotted(v-tab-pane) {
        width: 100%;
        display: none;
      }

      ::slotted(v-tab-pane[active='']) {
        display: block;
      }

      .tabs {
        display: flex;
        flex-basis: 100%;
        border-bottom: 2px solid #333;
        margin-top: -2px;
      }

      .tab-item {
        padding: 6px 12px;
        border: 2px solid #333;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
        cursor: pointer;
      }

      .tab-item.active {
        background-color: red;
      }

      .tab-item + .tab-item {
        margin-left: 6px;
      }

      .panes {
        display: block;
        width: 100%;
        padding-top: 16px;
      }
    </style>

    <div class="tabs"></div>

    <div class="panes">
      <slot></slot>
    </div>
  `

  customElements.define('v-tabs', class VTabs extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.tabContainer = this.shadowRoot.querySelector('.tabs')
    }

    connectedCallback() {
      customElements.whenDefined('v-tab-pane').then(val => {
        this.setLabels()
        this.initActive()
      })

      this.tabContainer.addEventListener('click', this.onTabClick.bind(this))
    }

    dosconnectedCallback() {
      this.tabContainer.removeEventListener('click', this.onTabClick.bind(this))
    }

    onTabClick(event) {
      const id = event.target.dataset.id
      this.resetTabs()
      this.allPanes()[id].active = true

      this.resetTabItems()
      this.shadowRoot.querySelector(`.tab-item[data-id="${id}"]`).classList.add('active')
    }

    setLabels() {
      let content = ''
      this.allPanes().forEach((item, index) => {
        content += `<div class="tab-item" data-id="${index}">${item.label}</div>`
      })
      this.shadowRoot.querySelector('.tabs').innerHTML = content
    }

    initActive() {
      let active = -1
      const panes = this.allPanes()

      panes.forEach((item, index) => {
        if (active) {
          item.removeAttribute('active')
          this.shadowRoot.querySelector('.tab-item').classList.remove('active')
        }
      })

      if (active === -1) {
        panes[0].active = true
        this.shadowRoot.querySelector('.tab-item').classList.add('active')
      }
    }

    allPanes() {
      return Array.from(this.querySelectorAll('v-tab-pane'))
    }

    allItems() {
      return Array.from(this.shadowRoot.querySelectorAll('.tab-item'))
    }

    resetTabs() {
      this.allPanes().forEach(item => item.removeAttribute('active'))
    }

    resetTabItems() {
      this.allItems().forEach(item => item.classList.remove('active'))
    }
  })



  const pane = document.createElement('template')
  pane.innerHTML = `
    <slot></slot>
  `

  customElements.define('v-tab-pane', class VTabPane extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(pane.content.cloneNode(true))
    }

    get active() {
      return this.hasAttribute('active')
    }

    set active(val) {
      this.setAttribute('active', '')
    }

    get label() {
      return this.getAttribute('label')
    }
  })
})()