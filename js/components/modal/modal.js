

(function () {
  /**
   * - v-modal
   * - on open
   *  - add backdrop (should be after body)
   *  - stop body from scrolling
   * - on backdropclick: close
   * - on close button close
   * on open buttin open
   * 
   * - v-modal-header
   * - v-modal-body
   */

  const modalTemp = document.createElement('template')

  modalTemp.innerHTML = `
    <style>
      :host {
        width: 500px;
        background: #fff;
        border: 2px solid black;
        border-radius: 4px;
        display: none;
        padding: 16px;
        z-index: 2;
      }

      :host(.open) {
        display: block;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
      }

      .modal-header {
        display: flex;
        align-items: center;
      }

      .modal-header-right {
        margin-left: auto;
      }
    </style>

    <div class="modal">
      <div class="modal-header">
        <slot name="header">
          <h2>Im a header</h2>

          <div class="modal-header-right">
            <button class="modal-close">Close</button>
          </div>
        </slot>
      </div>

      <div class="modal-body">
        <slot name="body">
          BOdy goes here
        </slot>
      </div>
    </div>
  `

  const backdropTemp = document.createElement('template')
  backdropTemp.innerHTML = '<div class="backdrop"></div>'

  customElements.define('v-modal', class VModal extends HTMLElement {
    static get observedAttributes() {
      return ['open']
    }

    constructor() {
      super()

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(modalTemp.content.cloneNode(true))

      this.closeButton = this.shadowRoot.querySelector('.modal-close')

      this.body = document.querySelector('body')
    }

    connectedCallback() {
      // handle initial open state
      // this._toggleOpen()

      this.closeButton.addEventListener('click', this._close.bind(this))
    }

    _close() {
      this.open = false
    }

    disconnectedCallback() {
      // is the bind needed?
      this.closeButton.removeEventListener('click', this._close.bind(this))
    }

    attributeChangedCallback() {
      // for side effects
      console.log('open')
      this._toggleOpen()
    }

    _toggleOpen() {
      if (this.open) {
        this.classList.add('open')
        this.body.classList.add('no-scroll')
        this._addBackdrop()
      } else {
        this.classList.remove('open')
        this.body.classList.remove('no-scroll')
        this._removeBackdrop()
      }
    }

    _addBackdrop() {
      this.body.appendChild(backdropTemp.content.cloneNode(true))
    }

    _removeBackdrop() {
      this.body.querySelector('.backdrop').remove()
    }

    get open() {
      return this.hasAttribute('open')
    }

    set open(value) {
      value = Boolean(value)

      if (value) {
        this.setAttribute('open', '')
      } else {
        this.removeAttribute('open')
      }
    }
  })

  customElements.define('v-modal-header', class VModalHeader extends HTMLElement {

  })

  customElements.define('v-modal-body', class VModalBody extends HTMLElement {

  })
})()